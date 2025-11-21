import React from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import DashNavbar from "@/components/navbar/DashNavbar";
import FooterComponent from "@/components/footer/FooterComponent";
import { MagicCard } from "@/components/ui/magic-card";
import { CometCard } from "@/components/ui/comet-card";


export default function AboutPage() {
  return (
    <>
    <DashNavbar />
    <div className="min-h-screen bg-black mt-16 pb-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          About NyaySetu
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
          Smart Legal Automation Platform empowering citizens with AI-driven
          legal guidance, document automation, and real-time legal updates.
          Breaking down barriers to legal access in India.
        </p>
      </div>

      {/* TracingBeam Content */}
      <TracingBeam className="px-6">
        <div className="max-w-4xl mx-auto antialiased pt-4 relative">
          {/* Feature 1 */}
          <div className="mb-32">
            <h2 className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              Feature 01
            </h2>

            <p className="text-xl mb-4 font-bold text-white">
              Legal Clause & IPC Explainability Chatbot
            </p>

            <div className="text-sm prose prose-sm prose-invert mb-6">
              <p className="text-gray-300 leading-relaxed">
                Your personal legal assistant that simplifies complex IPC
                sections, legal terms, and documents into plain English. Get
                instant guidance on legal clauses, incident analysis, and
                understand your legal documents with ease.
              </p>
            </div>

            <CometCard className="w-150 h-auto">
            <MagicCard className="w-full mb-6 rounded-lg">
              <div className="p-6 text-white">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-lg font-semibold mb-4">
                  Core Capabilities
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>
                      <strong className="text-white">
                        Simplify IPC Sections:
                      </strong>{" "}
                      Converts complex legal text into plain English
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>
                      <strong className="text-white">
                        Document Explainability:
                      </strong>{" "}
                      Highlights meaning of terms in FIRs, RTIs, Notices, Bail
                      applications
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>
                      <strong className="text-white">Incident Analysis:</strong>{" "}
                      Guides on applicable laws and next actions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>
                      <strong className="text-white">Legal Research:</strong>{" "}
                      Answers FAQs using comprehensive knowledge base
                    </span>
                  </li>
                </ul>
              </div>
            </MagicCard>
            </CometCard>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <MagicCard className="w-full mb-6 rounded-lg">
                <div className="p-5 text-white text-left flex flex-col">
                  <div className="mb-4">
                    <svg
                      width="38"
                      height="38"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">
                    Multi-Format Input
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>📝 Text query (typed input)</li>
                    <li>🎤 Voice query (speech-to-text)</li>
                    <li>📄 PDF, DOCX, TXT documents</li>
                    <li>🔍 OCR for scanned legal docs</li>
                  </ul>
                </div>
              </MagicCard>

              <MagicCard className="w-full mb-6 rounded-lg">
                <div className="p-5 text-white text-left flex flex-col">
                  <div className="mb-4">
                    <svg
                      width="38"
                      height="38"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Output Modes</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>💬 Text-based chatbot reply</li>
                    <li>🔊 Voice-based output (TTS)</li>
                    <li>🎯 Interactive Q&A for clarity</li>
                    <li>📋 Step-by-step guidance</li>
                  </ul>
                </div>
              </MagicCard>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "LangChain",
                "Gemini",
                "Legal-BERT",
                "ChromaDB",
                "Whisper",
                "FastAPI",
                "Tesseract OCR",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full font-medium border border-blue-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Feature 2 */}
          <div className="mb-32">
            <h2 className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              Feature 02
            </h2>

            <p className="text-xl mb-4 font-bold text-white">
              IPC Section Prediction Agent
            </p>

            <div className="text-sm prose prose-sm prose-invert mb-6">
              <p className="text-gray-300 leading-relaxed">
                Advanced AI agent that automatically identifies applicable IPC
                sections from your incident description. Uses state-of-the-art
                NLP to extract entities and predict relevant laws with
                confidence scores and detailed explanations.
              </p>
            </div>

               <CometCard className="w-150 h-auto">
            <MagicCard className="w-full mb-6 rounded-lg">
              <div className="p-6 text-white">
                <div className="text-4xl mb-4">⚖️</div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  How It Works
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      text: "Input your incident via text, voice, or document",
                      icon: "📥",
                    },
                    {
                      step: "2",
                      text: "AI extracts entities: who, what, when, where, how",
                      icon: "🔍",
                    },
                    {
                      step: "3",
                      text: "Retrieves candidate IPC sections from vector database",
                      icon: "💾",
                    },
                    {
                      step: "4",
                      text: "Classifies using Legal-BERT for accurate prediction",
                      icon: "🤖",
                    },
                    {
                      step: "5",
                      text: "Provides sections with confidence scores & explanations",
                      icon: "📊",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {item.step}
                      </div>
                      <div className="flex-1 pt-1">
                        <span className="text-gray-300">
                          {item.icon} {item.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </MagicCard>
            </CometCard>

            <NeonGradientCard className="w-full mb-6 !bg-[#171717] [&>*]:!bg-[#171717] [&>*]:!p-0">
              <div className="p-5 text-white">
                <h4 className="font-semibold text-white mb-3">Key Features</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-300">
                  <div>✨ Multi-format input support</div>
                  <div>✨ Entity extraction with NLP</div>
                  <div>✨ RAG-based retrieval system</div>
                  <div>✨ Confidence score display</div>
                  <div>✨ Explainability highlights</div>
                  <div>✨ Suggested legal actions</div>
                </div>
              </div>
            </NeonGradientCard>

            <div className="flex flex-wrap gap-2">
              {[
                "Legal-BERT",
                "GPT",
                "RAG Pipeline",
                "spaCy",
                "ChromaDB",
                "HuggingFace",
                "PyMuPDF",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full font-medium border border-purple-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Feature 3 */}
          <div className="mb-32">
            <h2 className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              Feature 03
            </h2>

            <p className="text-xl mb-4 font-bold text-white">
              Legal Draft Generation Automation
            </p>

            <div className="text-sm prose prose-sm prose-invert mb-6">
              <p className="text-gray-300 leading-relaxed">
                Automate creation of legal documents using AI-powered templates
                and dynamic questioning. Generate RTI applications, bail
                petitions, notices, and more with intelligent form filling and
                validation.
              </p>
            </div>

               <CometCard className="w-150 h-auto">
           <MagicCard className="w-full mb-6 rounded-lg">
              <div className="p-6 text-white">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Document Types Supported
                </h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">📋</span> RTI Applications
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">📋</span> Bail Petitions
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">📋</span> Legal Notices
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">📋</span> FIR Documents
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">📋</span> Affidavits
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">📋</span> Power of Attorney
                  </div>
                </div>
              </div>
            </MagicCard>
            </CometCard>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                {
                  title: "Input Collection",
                  icon: (
                    <svg
                      width="38"
                      height="38"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  ),
                  items: [
                    "Select document type",
                    "Upload supporting docs",
                    "AI-powered Q&A",
                    "Missing detail detection",
                  ],
                },
                {
                  title: "Processing",
                  icon: (
                    <svg
                      width="38"
                      height="38"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M12 1v6m0 6v6"></path>
                      <path d="m4.2 4.2 4.2 4.2m5.6 5.6 4.2 4.2m-14-6h6m6 0h6m-16.8 7.8 4.2-4.2m5.6-5.6 4.2-4.2"></path>
                    </svg>
                  ),
                  items: [
                    "Template selection",
                    "Auto-fill fields",
                    "Data validation",
                    "Completeness check",
                  ],
                },
                {
                  title: "Delivery",
                  icon: (
                    <svg
                      width="38"
                      height="38"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                    </svg>
                  ),
                  items: [
                    "Generate PDF/TXT",
                    "Email integration",
                    "Cloud storage",
                    "Download option",
                  ],
                },
              ].map((section, idx) => (
                <MagicCard className="w-full mb-6 rounded-lg" key={idx}>
                  <div className="p-4 text-white text-left flex flex-col">
                    <div className="mb-3">{section.icon}</div>
                    <h4 className="font-semibold text-white mb-3 text-sm">
                      {section.title}
                    </h4>
                    <ul className="text-xs text-gray-300 space-y-1">
                      {section.items.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </MagicCard>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "FastAPI",
                "Jinja2",
                "ReportLab",
                "Gmail API",
                "Tesseract OCR",
                "n8n",
                "PostgreSQL",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full font-medium border border-green-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Feature 4 */}
          <div className="mb-32">
            <h2 className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              Feature 04
            </h2>

            <p className="text-xl mb-4 font-bold text-white">
              Law & Judgment Update Automation
            </p>

            <div className="text-sm prose prose-sm prose-invert mb-6">
              <p className="text-gray-300 leading-relaxed">
                Stay informed with automated legal news aggregation and
                personalized newsletters. Get daily updates on new judgments,
                law amendments, and legal developments categorized by practice
                area.
              </p>
            </div>

                <CometCard className="w-150 h-auto">
           <MagicCard className="w-full mb-6 rounded-lg">
              <div className="p-6 text-white">
                <div className="text-4xl mb-4">📰</div>
                <h3 className="text-xl font-bold mb-4">Newsletter Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🔍</span>
                      <span className="text-gray-300">
                        Intelligent categorization
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📊</span>
                      <span className="text-gray-300">
                        AI-powered summarization
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🔔</span>
                      <span className="text-gray-300">
                        Custom frequency options
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🎯</span>
                      <span className="text-gray-300">
                        Personalized updates
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📚</span>
                      <span className="text-gray-300">Searchable archive</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">✉️</span>
                      <span className="text-gray-300">
                        Multi-channel delivery
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </MagicCard>
            </CometCard>

            <MagicCard className="w-full mb-6 rounded-lg">
              <div className="p-6 text-white">
                <h4 className="font-semibold text-white mb-4">Data Sources</h4>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">→</span>
                    <span>Official government portals & APIs</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">→</span>
                    <span>High Court & Supreme Court judgments</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">→</span>
                    <span>Legal amendments & notifications</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">→</span>
                    <span>Verified legal news aggregators</span>
                  </div>
                </div>
              </div>
            </MagicCard>

            <div className="flex flex-wrap gap-2">
              {[
                "BeautifulSoup",
                "SendGrid",
                "PostgreSQL",
                "HuggingFace",
                "n8n",
                "Cron Jobs",
                "Gmail API",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full font-medium border border-orange-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Section */}
          <div className="mb-10">
            <NeonGradientCard className="w-full !bg-[#171717] [&>*]:!bg-[#171717] [&>*]:!p-0">
              <div className="p-8 text-white text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Empowering Legal Access for All
                </h3>
                <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
                  NyaySetu bridges the gap between complex legal systems and
                  citizens, making justice accessible through AI-powered
                  automation.
                </p>
                <div className="inline-block bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 text-sm font-medium border border-white/20">
                  ⚠️ For guidance purposes only • Not a substitute for
                  professional legal advice
                </div>
              </div>
            </NeonGradientCard>
          </div>
        </div>
      </TracingBeam>
      <FooterComponent />
    </div>
    </>
  );
}
