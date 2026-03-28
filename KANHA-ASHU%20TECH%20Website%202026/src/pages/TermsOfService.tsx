"use client";

import { motion } from "framer-motion";
import { FileText, Gavel, UserCheck, AlertTriangle, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const TermsOfService = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-[#0E0E10] min-h-screen text-white overflow-hidden font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 md:pt-48 pb-20 px-6 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10 space-y-6">
                    <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 group text-sm font-medium">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight"
                    >
                        Terms of <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">Service</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg"
                    >
                        Last Updated: March 2026
                    </motion.p>
                </div>
            </section>

            {/* Content Section */}
            <section className="pb-24 px-6 relative">
                <div className="max-w-4xl mx-auto space-y-12 text-gray-300 leading-relaxed">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <FileText className="text-brand-orange w-6 h-6" /> 1. Acceptance of Terms
                        </h2>
                        <p>
                            By accesssing the KANHA ASHU TECH website or engaging in our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our website or commissioning our services.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Gavel className="text-brand-orange w-6 h-6" /> 2. Scope of Services
                        </h2>
                        <p>
                            KANHA ASHU TECH provides digital strategy, website development, e-commerce solutions, and digital marketing services. The specific scope, timeline, and deliverables for each project will be outlined in separate service agreements or project proposals.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <UserCheck className="text-brand-orange w-6 h-6" /> 3. Intellectual Property
                        </h2>
                        <p>
                            Upon full payment of all fees, the client shall own the final deliverables as defined in the project scope. KANHA ASHU TECH retains the right to showcase the completed work in our portfolio and marketing materials unless a non-disclosure agreement (NDA) is in place.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <AlertTriangle className="text-brand-orange w-6 h-6" /> 4. Limitation of Liability
                        </h2>
                        <p>
                            KANHA ASHU TECH shall not be held liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services. We do not guarantee specific business results (such as exact revenue figures), as digital success depends on various market factors beyond our control.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <FileText className="text-brand-orange w-6 h-6" /> 5. Termination
                        </h2>
                        <p>
                            We reserve the right to terminate or suspend access to our services immediately, without prior notice, if you breach these Terms of Service or engage in activities that could harm our digital infrastructure or reputation.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default TermsOfService;
