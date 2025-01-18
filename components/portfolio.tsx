'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase, Code2, Download, ExternalLink, Github, Linkedin, Mail, MapPin, Phone, School, Send, User2, Moon, Sun, Menu } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export default function Portfolio() {
  const aboutRef = useRef<HTMLElement>(null)
  const experienceRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const certificationsRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('about')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: '',
    success: ''
  })

  useEffect(() => {
    // Check system preference on mount
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for better accuracy

      const sections = [
        { ref: aboutRef, id: 'about' },
        { ref: experienceRef, id: 'experience' },
        { ref: projectsRef, id: 'projects' },
        { ref: certificationsRef, id: 'certifications' },
        { ref: skillsRef, id: 'skills' },
        { ref: contactRef, id: 'contact' }
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current && section.ref.current.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const scrollToSection = (ref: React.RefObject<HTMLElement>, section: string) => {
    const offset = window.innerWidth < 768 ? 60 : 80 // Smaller offset for mobile
    const elementPosition = ref.current?.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
    setActiveSection(section)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus({ loading: true, error: '', success: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message')
      }

      setFormStatus({
        loading: false,
        error: '',
        success: data.message
      })
      setFormData({ name: '', email: '', message: '' })

    } catch (error) {
      setFormStatus({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to send message',
        success: ''
      })
    }
  }

  return (
    <div className="min-h-screen bg-background px-4">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl flex h-14 items-center px-2 md:px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden dark:text-white">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col space-y-4">
                <SheetClose asChild>
                  <button 
                    onClick={() => scrollToSection(aboutRef, 'about')}
                    className={`text-left transition-colors hover:text-foreground/80 dark:hover:text-white/80 ${
                      activeSection === 'about' ? 'text-foreground dark:text-white' : 'text-foreground/60 dark:text-white/60'
                    }`}
                  >
                    About
                  </button>
                </SheetClose>
                <SheetClose asChild>
                  <button 
                    onClick={() => scrollToSection(experienceRef, 'experience')}
                    className={`text-left transition-colors hover:text-foreground/80 dark:hover:text-white/80 ${
                      activeSection === 'experience' ? 'text-foreground dark:text-white' : 'text-foreground/60 dark:text-white/60'
                    }`}
                  >
                    Experience
                  </button>
                </SheetClose>
                <SheetClose asChild>
                  <button 
                    onClick={() => scrollToSection(projectsRef, 'projects')}
                    className={`text-left transition-colors hover:text-foreground/80 dark:hover:text-white/80 ${
                      activeSection === 'projects' ? 'text-foreground dark:text-white' : 'text-foreground/60 dark:text-white/60'
                    }`}
                  >
                    Projects
                  </button>
                </SheetClose>
                <SheetClose asChild>
                  <button 
                    onClick={() => scrollToSection(certificationsRef, 'certifications')}
                    className={`text-left transition-colors hover:text-foreground/80 dark:hover:text-white/80 ${
                      activeSection === 'certifications' ? 'text-foreground dark:text-white' : 'text-foreground/60 dark:text-white/60'
                    }`}
                  >
                    Certifications
                  </button>
                </SheetClose>
                <SheetClose asChild>
                  <button 
                    onClick={() => scrollToSection(skillsRef, 'skills')}
                    className={`text-left transition-colors hover:text-foreground/80 dark:hover:text-white/80 ${
                      activeSection === 'skills' ? 'text-foreground dark:text-white' : 'text-foreground/60 dark:text-white/60'
                    }`}
                  >
                    Skills
                  </button>
                </SheetClose>
                <SheetClose asChild>
                  <button 
                    onClick={() => scrollToSection(contactRef, 'contact')}
                    className={`text-left transition-colors hover:text-foreground/80 dark:hover:text-white/80 ${
                      activeSection === 'contact' ? 'text-foreground dark:text-white' : 'text-foreground/60 dark:text-white/60'
                    }`}
                  >
                    Contact
                  </button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="mr-4 hidden md:flex">
            {/* <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block dark:text-white">Rounak Singh</span>
            </Link> */}
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <button onClick={() => scrollToSection(aboutRef, 'about')} className={`transition-colors hover:text-foreground/80 dark:hover:text-white/80 ${activeSection === 'about' ? 'text-foreground dark:text-white' : 'text-foreground/60 dark:text-white/60'}`}>About</button>
              <button onClick={() => scrollToSection(experienceRef, 'experience')} className={`transition-colors hover:text-foreground/80 dark:hover:text-white/80 ${activeSection === 'experience' ? 'text-foreground dark:text-white' : 'text-foreground/60 dark:text-white/60'}`}>Experience</button>
              <button onClick={() => scrollToSection(projectsRef, 'projects')} className={`transition-colors hover:text-foreground/80 dark:hover:text-white/80 ${activeSection === 'projects' ? 'text-foreground dark:text-white' : 'text-foreground/60 dark:text-white/60'}`}>Projects</button>
              <button onClick={() => scrollToSection(certificationsRef, 'certifications')} className={`transition-colors hover:text-foreground/80 dark:hover:text-white/80 ${activeSection === 'certifications' ? 'text-foreground dark:text-white' : 'text-foreground/60 dark:text-white/60'}`}>Certifications</button>
              <button onClick={() => scrollToSection(skillsRef, 'skills')} className={`transition-colors hover:text-foreground/80 dark:hover:text-white/80 ${activeSection === 'skills' ? 'text-foreground dark:text-white' : 'text-foreground/60 dark:text-white/60'}`}>Skills</button>
              <button onClick={() => scrollToSection(contactRef, 'contact')} className={`transition-colors hover:text-foreground/80 dark:hover:text-white/80 ${activeSection === 'contact' ? 'text-foreground dark:text-white' : 'text-foreground/60 dark:text-white/60'}`}>Contact</button>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none my-auto ml-2 md:ml-0">
              <Button variant="outline" className="inline-flex items-center rounded-full dark:text-white" asChild>
                <a href="/files/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </div>
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="dark:text-white">
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="sr-only">Toggle dark mode</span>
              </Button>
              <Button variant="ghost" size="icon" className="dark:text-white" asChild>
                <Link href="https://github.com/RounakS33/" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="dark:text-white" asChild>
                <Link href="https://www.linkedin.com/in/rounaksingh33/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="container mx-auto max-w-7xl py-6 md:py-12">
        <section ref={aboutRef} className="mx-auto max-w-4xl space-y-8 py-8">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl dark:text-white">Rounak Singh</h1>
              <h2 className="text-xl text-muted-foreground">AI/ML Developer & Data Scientist</h2>
              <p className="max-w-[600px] text-muted-foreground dark:text-white/70">
                I specialize in building AI/ML solutions and data-driven applications with a focus on practical implementation and research.
              </p>
              <div className="flex items-center space-x-4 text-muted-foreground dark:text-white/70">
                <MapPin className="h-4 w-4" />
                <span>Kolkata, India</span>
              </div>
            </div>
            <Image
              src="/files/profile.jpg"
              alt="Profile"
              width={200}
              height={200}
              className="rounded-full aspect-square object-cover border"
            />
          </div>
        </section>
        <section ref={experienceRef} className="mx-auto max-w-4xl space-y-8 py-8">
          <div className="flex items-center dark:text-white">
            <Briefcase className="mr-2 h-6 w-6" />
            <h2 className="text-4xl font-bold tracking-tight dark:text-white">Experience</h2>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="relative border-l border-gray-200 dark:border-gray-700">
              <div className="mb-8 ml-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Jan 2025 - Feb 2025</time>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">Deep Learning Intern</h3>
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400 mt-1">Microsoft, SAP-AICTE</p>
                  <ul className="mt-2 list-disc list-inside space-y-1 text-base text-muted-foreground dark:text-white/70">
                    <li>Developed and deployed computer vision models for real-time object detection</li>
                    <li>Improved model accuracy by 35% using transfer learning techniques</li>
                    <li>Led a team of 3 ML engineers in developing NLP solutions</li>
                  </ul>
                </div>
                {/* <div className="mb-8 ml-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Jan 2025 - Feb 2025</time>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">Deep Learning Intern</h3>
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400 mt-1">Microsoft, SAP-AICTE</p>
                  <ul className="mt-2 list-disc list-inside space-y-1 text-base text-muted-foreground dark:text-white/70">
                    <li>Developed and deployed computer vision models for real-time object detection</li>
                    <li>Improved model accuracy by 35% using transfer learning techniques</li>
                    <li>Led a team of 3 ML engineers in developing NLP solutions</li>
                  </ul>
                </div> */}
                {/* You can add more experience items here following the same structure */}
              </div>
            </CardContent>
          </Card>
        </section>
        <section ref={projectsRef} className="mx-auto max-w-4xl space-y-8 py-8">
     <div className="flex items-center dark:text-white">
       <Code2 className="mr-2 h-6 w-6" />
       <h2 className="text-4xl font-bold tracking-tight dark:text-white">Projects</h2>
     </div>
     <Card>
       <CardContent className="p-6">
         <div className="space-y-6">
           <div>
             <h3 className="text-2xl font-semibold">Movie Recommendation System</h3>
             <p className="text-sm text-muted-foreground dark:text-white/60 mt-1">Scikit-learn, NLTK, NumPy, Pandas, Streamlit</p>
             <p className="mt-2 text-base text-muted-foreground dark:text-white/70">
               This project leverages Streamlit for the front-end interface and employs TF-IDF vectorization along with natural language processing (NLP)
               techniques to provide personalized movie recommendations.
             </p>
             <div className="mt-4">
               {/* <Button variant="outline" size="sm" className="gap-2 mr-2" asChild>
                 <Link href="#" target="_blank" rel="noopener noreferrer">
                   <ExternalLink className="h-4 w-4" />
                   Demo
                 </Link>
               </Button> */}
               <Button variant="outline" size="sm" className="gap-2" asChild>
                 <Link href="https://github.com/RounakS33/movie_recommendation_system" target="_blank" rel="noopener noreferrer">
                   <Github className="h-4 w-4" />
                   Code
                 </Link>
               </Button>
             </div>
           </div>
           <div>
             <h3 className="text-2xl font-semibold">Tomato Plant Disease Detection and Classification System</h3>
             <p className="text-sm text-muted-foreground dark:text-white/60 mt-1">TensorFlow, Pickle, Pillow, Streamlit</p>
             <p className="mt-2 text-base text-muted-foreground dark:text-white/70">
              This project classifies tomato plant diseases using a Convolutional Neural Network (CNN). The application is built with Streamlit and allows users to upload images of tomato leaves to predict the disease.
             </p>
             <div className="mt-4">
               {/* <Button variant="outline" size="sm" className="gap-2 mr-2" asChild>
                 <Link href="#" target="_blank" rel="noopener noreferrer">
                   <ExternalLink className="h-4 w-4" />
                   Demo
                 </Link>
               </Button> */}
               <Button variant="outline" size="sm" className="gap-2" asChild>
                 <Link href="https://github.com/RounakS33/tomato_plant_disease_detection_system" target="_blank" rel="noopener noreferrer">
                   <Github className="h-4 w-4" />
                   Code
                 </Link>
               </Button>
             </div>
           </div>
         </div>
       </CardContent>
     </Card>
   </section>
        <section ref={certificationsRef} className="mx-auto max-w-4xl space-y-8 py-8">
  <div className="flex items-center dark:text-white">
    <School className="mr-2 h-6 w-6" />
    <h2 className="text-4xl font-bold tracking-tight dark:text-white">Certifications</h2>
  </div>
  <Card>
    <CardContent className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold">IBM Machine Learning</h3>
          <p className="text-sm text-muted-foreground dark:text-white/60">Coursera - IBM</p>
          <p className="text-base text-muted-foreground dark:text-white/70 mt-1">Issued Dec 2024 - No Expiration</p>
          <Button variant="link" className="h-auto p-0 mt-2" asChild>
            <Link href="https://www.coursera.org/account/accomplishments/specialization/certificate/W0IKXC53U9B3" target="_blank" rel="noopener noreferrer">
              Verify Certificate →
            </Link>
          </Button>
        </div>
        <div>
          <h3 className="text-2xl font-semibold">Machine Learning Engineer Nanodegree</h3>
          <p className="text-sm text-muted-foreground dark:text-white/60">Udacity</p>
          <p className="text-base text-muted-foreground dark:text-white/70 mt-1">Issued Jun 2023 - No Expiration</p>
          <Button variant="link" className="h-auto p-0 mt-2" asChild>
            <Link href="https://confirm.udacity.com/XXXXX" target="_blank" rel="noopener noreferrer">
              Verify Certificate →
            </Link>
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</section>
        <section ref={skillsRef} className="mx-auto max-w-4xl space-y-8 py-8">
          <div className="flex items-center dark:text-white">
            <User2 className="mr-2 h-6 w-6" />
            <h2 className="text-4xl font-bold tracking-tight dark:text-white">Skills</h2>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" className="rounded-full" disabled>Python</Button>
                <Button variant="secondary" className="rounded-full" disabled>TensorFlow</Button>
                <Button variant="secondary" className="rounded-full" disabled>PyTorch</Button>
                <Button variant="secondary" className="rounded-full" disabled>Scikit-learn</Button>
                <Button variant="secondary" className="rounded-full" disabled>Pandas</Button>
                <Button variant="secondary" className="rounded-full" disabled>NumPy</Button>
                <Button variant="secondary" className="rounded-full" disabled>OpenCV</Button>
                <Button variant="secondary" className="rounded-full" disabled>Keras</Button>
                <Button variant="secondary" className="rounded-full" disabled>NLTK</Button>
                <Button variant="secondary" className="rounded-full" disabled>Spark</Button>
                <Button variant="secondary" className="rounded-full" disabled>Docker</Button>
                <Button variant="secondary" className="rounded-full" disabled>Git</Button>
                <Button variant="secondary" className="rounded-full" disabled>MLflow</Button>
                <Button variant="secondary" className="rounded-full" disabled>FastAPI</Button>
                <Button variant="secondary" className="rounded-full" disabled>SQL</Button>
                <Button variant="secondary" className="rounded-full" disabled>MongoDB</Button>
                <Button variant="secondary" className="rounded-full" disabled>AWS</Button>
                <Button variant="secondary" className="rounded-full" disabled>GCP</Button>
              </div>
            </CardContent>
          </Card>
        </section>
        <section ref={contactRef} className="mx-auto max-w-4xl space-y-8 py-8">
          <div className="flex items-center dark:text-white">
            <Mail className="mr-2 h-6 w-6" />
            <h2 className="text-4xl font-bold tracking-tight dark:text-white">Contact</h2>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-4 w-4" />
                    <Link href="mailto:singhrounak927@gmail.com" className="text-muted-foreground hover:underline dark:text-white/70 dark:hover:text-white">
                    singhrounak927@gmail.com
                    </Link>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="h-4 w-4" />
                    <Link href="tel:+919007790033" className="text-muted-foreground hover:underline dark:text-white/70 dark:hover:text-white">
                      +91 9007790033
                    </Link>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Linkedin className="h-4 w-4" />
                    <Link
                      href="https://www.linkedin.com/in/rounaksingh33/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:underline dark:text-white/70 dark:hover:text-white"
                    >
                      linkedin.com/in/rounaksingh33
                    </Link>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input 
                    placeholder="Name" 
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={formStatus.loading}
                  />
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={formStatus.loading}
                  />
                  <Textarea 
                    placeholder="Message" 
                    value={formData.message}
                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    disabled={formStatus.loading}
                  />
                  {formStatus.error && (
                    <p className="text-sm text-destructive">{formStatus.error}</p>
                  )}
                  {formStatus.success && (
                    <p className="text-sm text-green-600 dark:text-green-400">{formStatus.success}</p>
                  )}
                  <Button type="submit" className="w-full gap-2" disabled={formStatus.loading}>
                    {formStatus.loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <footer className="border-t">
        <div className="container mx-auto max-w-7xl flex h-14 items-center justify-center">
          <p className="text-sm text-muted-foreground dark:text-white/70">
            © 2024 Rounak Singh. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

