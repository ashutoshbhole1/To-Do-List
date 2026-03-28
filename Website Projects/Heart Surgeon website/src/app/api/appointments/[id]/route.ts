import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import nodemailer from "nodemailer";
import { format } from "date-fns";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    await dbConnect();
    const body = await req.json();
    
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, body, { new: true });
    
    if (!updatedAppointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    // Email Sending Logic
    if (["approved", "rejected", "rescheduled"].includes(body.status) && updatedAppointment.email) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        let safeDateString = updatedAppointment.date;
        try {
          safeDateString = format(new Date(updatedAppointment.date), "EEEE, MMMM do, yyyy");
        } catch(e) {}

        let subject = "";
        let textBody = "";

        if (body.status === "approved") {
          let meetLink = "";
          let extraInfo = "";

          if (updatedAppointment.type === "online") {
            if (!updatedAppointment.meetLink) {
              meetLink = `https://meet.google.com/xyz-${Math.random().toString(36).substring(2,7)}-abc`;
              updatedAppointment.meetLink = meetLink;
              await updatedAppointment.save();
            } else {
              meetLink = updatedAppointment.meetLink;
            }
            extraInfo = `This is an Online Video Consultation.\n\nHere is your Google Meet Link: ${meetLink}\n(Please join 5 minutes early)`;
          } else {
            extraInfo = `This is an In-Person Hospital Visit.\n\nPlease arrive 15 minutes early at Sterling Hospital, Rajkot.`;
          }

          subject = "Confirmed: Your Appointment with Dr. Sarveshwer Prasad";
          textBody = `Dear ${updatedAppointment.patientName},\n\nYour appointment request has been approved!\n\nDate: ${safeDateString}\nTime: ${updatedAppointment.time}\n\n${extraInfo}\n\nWe look forward to seeing you.\n\nBest Regards,\nHeart Surgeon Clinic Team\nPhone: +91 9909751284`;
        } 
        else if (body.status === "rejected") {
          subject = "Update on Your Appointment Request";
          textBody = `Dear ${updatedAppointment.patientName},\n\nWe regret to inform you that your appointment request for ${safeDateString} at ${updatedAppointment.time} could not be approved at this time.\n\nPlease contact us directly at +91 9909751284 to discuss alternative arrangements.\n\nBest Regards,\nHeart Surgeon Clinic Team`;
        }
        else if (body.status === "rescheduled") {
          let extraInfo = "";
          if (updatedAppointment.type === "online") {
            if (!updatedAppointment.meetLink) {
              const meetLink = `https://meet.google.com/xyz-${Math.random().toString(36).substring(2,7)}-abc`;
              updatedAppointment.meetLink = meetLink;
              await updatedAppointment.save();
            }
            extraInfo = `This is an Online Video Consultation.\n\nHere is your Google Meet Link: ${updatedAppointment.meetLink}\n(Please join 5 minutes early)`;
          } else {
            extraInfo = `This is an In-Person Hospital Visit.\n\nPlease arrive 15 minutes early at Sterling Hospital, Rajkot.`;
          }

          subject = "Rescheduled: Your Appointment with Dr. Sarveshwer Prasad";
          textBody = `Dear ${updatedAppointment.patientName},\n\nYour appointment has been officially rescheduled by the clinic.\n\nNEW Date: ${safeDateString}\nNEW Time: ${updatedAppointment.time}\n\n${extraInfo}\n\nIf you have any questions or cannot make this new time, please contact us at +91 9909751284.\n\nBest Regards,\nHeart Surgeon Clinic Team`;
        }

        const mailOptions = {
          from: `"Dr. Prasad Clinic" <${process.env.EMAIL_USER}>`,
          to: updatedAppointment.email,
          subject: subject,
          text: textBody,
        };

        if (process.env.EMAIL_USER && process.env.EMAIL_USER !== "your-email@gmail.com") {
          await transporter.sendMail(mailOptions);
          console.log(`Email (${body.status}) sent successfully to`, updatedAppointment.email);
        } else {
          console.warn("EMAIL_USER or EMAIL_PASS not fully configured. Email skipped.");
        }
      } catch (emailErr) {
        console.error("Failed to send email (check app password):", emailErr);
      }
    }

    return NextResponse.json({ success: true, data: updatedAppointment });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
