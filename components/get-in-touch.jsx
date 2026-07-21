"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Send, Mail, MapPin, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FadeUp, SlideIn } from "@/components/VelocityScroll";

const socialLinks = [
  { href: "https://github.com/Givaro-Ananta", icon: FaGithub, label: "GitHub" },
  { href: "https://linkedin.com/in/givaro-ananta", icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://instagram.com/givarooo", icon: FaInstagram, label: "Instagram" },
];

const focusStyle = (e) => {
  e.target.style.boxShadow = "0 0 0 2px rgba(168,85,247,0.5)";
};
const blurStyle = (e) => {
  e.target.style.boxShadow = "none";
};

const inputClass =
  "w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-all";

export default function GetInTouch() {
  const formRef = useRef(null);
  const timeRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    // Inject current timestamp into hidden field
    if (timeRef.current) {
      timeRef.current.value = new Date().toLocaleString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });
    }

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY }
      );
      setStatus("success");
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-950 overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-6">

        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Get In{" "}
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach
              out to me using the form below or through my contact information.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Info — slide dari kiri */}
          <SlideIn from="left" delay={0.1}>
            <div>
              <h3 className="text-xl font-semibold mb-6">How to Reach Me</h3>
              <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-800 rounded-lg text-purple-500 shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <a href="mailto:givaroananta02@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                        givaroananta02@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-800 rounded-lg text-purple-500">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Location</h4>
                      <p className="text-gray-400">Lampung, Indonesia</p>
                    </div>
                  </div>
              </div>
              <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4">Follow Me</h3>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="p-3 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
                    >
                      <link.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </SlideIn>

          {/* Form — slide dari kanan */}
          <SlideIn from="right" delay={0.15}>
            <div>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="time" ref={timeRef} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="from_name" className="block text-sm font-medium mb-2">Your Name</label>
                    <input type="text" id="from_name" name="from_name" required
                      className={inputClass}
                      onFocus={focusStyle} onBlur={blurStyle} />
                  </div>
                  <div>
                    <label htmlFor="from_email" className="block text-sm font-medium mb-2">Your Email</label>
                    <input type="email" id="from_email" name="from_email" required
                      className={inputClass}
                      onFocus={focusStyle} onBlur={blurStyle} />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <input type="text" id="subject" name="subject" required
                    className={inputClass}
                    onFocus={focusStyle} onBlur={blurStyle} />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea id="message" name="message" required rows={5}
                    className={`${inputClass} resize-none`}
                    onFocus={focusStyle} onBlur={blurStyle} />
                </div>

                {/* Status notification */}
                {status === "success" && (
                  <div className="flex items-center gap-2 text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-3 text-sm">
                    <CheckCircle size={16} />
                    Message sent successfully! I&apos;ll get back to you soon.
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3 text-sm">
                    <XCircle size={16} />
                    Failed to send. Please try again or email me directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </SlideIn>

        </div>
      </div>
    </section>
  );
}
