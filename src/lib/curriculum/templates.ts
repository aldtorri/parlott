export interface LessonTemplate {
  title: string
  topic: string
  description: string
  keyTopics: string[]
  warmupQuestion: string
  promptHints?: string
}

export type LanguageCode = "ENGLISH" | "SPANISH" | "PORTUGUESE" | "FRENCH"
export type ObjectiveSlug = string
export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2"

export const CURRICULUM: Record<LanguageCode, Record<ObjectiveSlug, Partial<Record<Level, LessonTemplate[]>>>> = {
  ENGLISH: {
    "en-business": {
      A1: [
        { title: "Presentaciones básicas", topic: "Basic professional introductions: name, job title, company", description: "Aprende a presentarte en un contexto laboral.", keyTopics: ["hello", "my name is", "I work at", "nice to meet you"], warmupQuestion: "Hi! Tell me your name and what you do for work." },
        { title: "Puestos de trabajo", topic: "Job titles and roles: manager, engineer, assistant, director", description: "Vocabulario de cargos y posiciones en la empresa.", keyTopics: ["manager", "engineer", "assistant", "director", "CEO"], warmupQuestion: "What is your job title? Do you know any other job titles in English?" },
        { title: "Vocabulario de oficina", topic: "Office objects and spaces: desk, meeting room, computer, printer", description: "Nombra los objetos y lugares más comunes de una oficina.", keyTopics: ["desk", "computer", "meeting room", "printer", "office"], warmupQuestion: "Look around your workspace. Can you name three things you see in English?" },
        { title: "Saludar a colegas", topic: "Greeting coworkers: good morning, how are you, nice to meet you", description: "Frases para saludar a compañeros de trabajo.", keyTopics: ["good morning", "how are you", "have a nice day", "see you later"], warmupQuestion: "How do you usually greet your coworkers in the morning?" },
        { title: "Números y fechas", topic: "Numbers, dates and times in a business context", description: "Usa números, fechas y horas en situaciones laborales.", keyTopics: ["January", "Monday", "three o'clock", "twenty-five"], warmupQuestion: "What day is it today? What time do you start work?" },
      ],
      A2: [
        { title: "Tareas diarias", topic: "Describing daily work tasks", description: "Describe tus actividades laborales cotidianas.", keyTopics: ["attend meetings", "send emails", "prepare reports", "work on projects"], warmupQuestion: "What do you usually do at work every day?" },
        { title: "Horarios y agendas", topic: "Talking about schedules and appointments", description: "Habla sobre horarios y citas de trabajo.", keyTopics: ["schedule", "appointment", "meeting at 3pm", "deadline"], warmupQuestion: "Do you have any meetings today? What time?" },
        { title: "Reuniones simples", topic: "Basic meeting phrases", description: "Frases útiles para participar en reuniones básicas.", keyTopics: ["shall we start", "any questions", "let's move on", "I agree"], warmupQuestion: "Have you been in a meeting recently? What was it about?" },
        { title: "Preguntas en el trabajo", topic: "Asking and answering basic work questions", description: "Haz y responde preguntas comunes en el trabajo.", keyTopics: ["where is", "can you help me", "what does it mean", "how do I"], warmupQuestion: "What question do you ask most often at work?" },
        { title: "Correos electrónicos simples", topic: "Writing simple business emails", description: "Estructura y vocabulario para correos laborales sencillos.", keyTopics: ["Dear", "Best regards", "I am writing to", "Please find attached"], warmupQuestion: "How do you usually start a work email in English?" },
      ],
      B1: [
        { title: "Participar en reuniones", topic: "Contributing to meetings with opinions", description: "Expresa opiniones y participa activamente en reuniones.", keyTopics: ["I think", "in my opinion", "I agree", "could we discuss"], warmupQuestion: "Tell me about the last meeting you had. Did you share your opinion?" },
        { title: "Dar actualizaciones", topic: "Giving project updates", description: "Reporta el avance de proyectos de forma clara.", keyTopics: ["we completed", "we're working on", "the next step", "we encountered"], warmupQuestion: "Can you give me an update on something you're working on right now?" },
        { title: "Explicar ideas", topic: "Explaining concepts and ideas clearly", description: "Articula ideas y conceptos de manera comprensible.", keyTopics: ["the reason is", "what I mean is", "for example", "in other words"], warmupQuestion: "Think of an idea you had recently. Can you explain it to me in English?" },
        { title: "Conversaciones profesionales", topic: "Professional conversations about roles and goals", description: "Mantén conversaciones fluidas en contextos profesionales.", keyTopics: ["career goals", "professional development", "feedback", "responsibilities"], warmupQuestion: "What are your professional goals for this year?" },
        { title: "Problemas en el trabajo", topic: "Describing and solving work problems", description: "Comunica y propone soluciones a problemas laborales.", keyTopics: ["there's an issue", "we need to fix", "I suggest", "what if we"], warmupQuestion: "Can you tell me about a problem you had to solve at work?" },
      ],
      B2: [
        { title: "Presentar ideas", topic: "Presenting ideas persuasively", description: "Presenta propuestas e ideas con claridad y persuasión.", keyTopics: ["I'd like to propose", "the key benefit", "let me explain why", "consider this"], warmupQuestion: "If you had to pitch an idea to your boss right now, what would it be?" },
        { title: "Opiniones en reuniones", topic: "Expressing and defending opinions", description: "Defiende tus puntos de vista en discusiones profesionales.", keyTopics: ["I strongly believe", "the data shows", "have you considered", "with all due respect"], warmupQuestion: "What's something you feel strongly about at work? Why?" },
        { title: "Negociación básica", topic: "Negotiation language", description: "Usa lenguaje de negociación en situaciones laborales.", keyTopics: ["what if we", "I can offer", "that's not feasible", "middle ground"], warmupQuestion: "Have you ever had to negotiate something at work? What happened?" },
        { title: "Situaciones laborales complejas", topic: "Handling complex work situations", description: "Navega situaciones laborales difíciles con confianza.", keyTopics: ["conflict resolution", "difficult conversation", "giving bad news", "empathy"], warmupQuestion: "How do you handle difficult conversations with coworkers?" },
        { title: "Reportes y análisis", topic: "Discussing reports and data", description: "Presenta y discute datos y resultados de manera profesional.", keyTopics: ["the results indicate", "compared to", "the trend shows", "key takeaway"], warmupQuestion: "Can you describe some data or results from your recent work?" },
      ],
      C1: [
        { title: "Discusiones avanzadas", topic: "Advanced business discussions: strategic planning", description: "Participa en discusiones de negocios a nivel estratégico.", keyTopics: ["strategic planning", "market analysis", "organizational change", "competitive advantage"], warmupQuestion: "What strategic challenges does your industry face right now?" },
        { title: "Persuasión e influencia", topic: "Persuasive communication techniques", description: "Usa técnicas avanzadas de persuasión en inglés.", keyTopics: ["framing arguments", "addressing objections", "building consensus", "stakeholder management"], warmupQuestion: "How do you convince someone who disagrees with you at work?" },
        { title: "Comunicación de liderazgo", topic: "Leadership communication", description: "Comunícate como líder con impacto y claridad.", keyTopics: ["motivating teams", "vision statement", "difficult decisions", "transparency"], warmupQuestion: "What makes a great leader in communication? Give me an example." },
        { title: "Presentaciones ejecutivas", topic: "Executive presentations with storytelling", description: "Da presentaciones ejecutivas de alto impacto.", keyTopics: ["storytelling with data", "executive summary", "Q&A handling", "key message"], warmupQuestion: "If you had to present to the CEO, what would be your opening line?" },
        { title: "Networking avanzado", topic: "Advanced professional networking", description: "Construye relaciones profesionales en inglés a nivel avanzado.", keyTopics: ["elevator pitch", "building rapport", "conference conversations", "follow-up"], warmupQuestion: "How do you introduce yourself at a professional event?" },
      ],
    },
    "en-general": {
      A1: [
        { title: "Presentaciones personales", topic: "Personal introductions: name, age, country, family", description: "Preséntate y habla sobre ti de forma básica.", keyTopics: ["my name is", "I am from", "I am years old", "I live in"], warmupQuestion: "Tell me about yourself. What is your name and where are you from?" },
        { title: "Mi familia", topic: "Talking about family members", description: "Describe a tu familia con vocabulario sencillo.", keyTopics: ["mother", "father", "brother", "sister", "family"], warmupQuestion: "Do you have a big family? Tell me about them." },
        { title: "Rutina diaria", topic: "Daily routine activities", description: "Describe tus actividades diarias más comunes.", keyTopics: ["wake up", "have breakfast", "go to work", "go to bed"], warmupQuestion: "What do you do every morning when you wake up?" },
        { title: "Gustos y preferencias", topic: "Likes and dislikes", description: "Expresa tus gustos y preferencias personales.", keyTopics: ["I like", "I don't like", "my favorite", "I prefer"], warmupQuestion: "What is your favorite food? Do you like cooking?" },
        { title: "Números y colores", topic: "Numbers, colors, and basic descriptions", description: "Usa números y colores en conversaciones cotidianas.", keyTopics: ["one", "ten", "red", "blue", "big", "small"], warmupQuestion: "What is your favorite color? Can you count to ten in English?" },
      ],
      A2: [
        { title: "Hobbies y tiempo libre", topic: "Hobbies and free time activities", description: "Habla sobre tus pasatiempos y actividades de ocio.", keyTopics: ["I enjoy", "on weekends", "I'm interested in", "I play"], warmupQuestion: "What do you like to do in your free time?" },
        { title: "Planes y futuro", topic: "Making plans and talking about the future", description: "Habla sobre planes futuros y proyectos personales.", keyTopics: ["I'm going to", "I want to", "this weekend", "next year"], warmupQuestion: "Do you have any plans for this weekend?" },
        { title: "Ir de compras", topic: "Shopping situations", description: "Maneja situaciones de compras en inglés.", keyTopics: ["how much", "I'd like", "too expensive", "I'll take it"], warmupQuestion: "What was the last thing you bought? How much did it cost?" },
        { title: "Experiencias pasadas", topic: "Past experiences and events", description: "Cuenta experiencias y eventos pasados.", keyTopics: ["I went", "I saw", "I ate", "last year"], warmupQuestion: "What did you do last weekend? Tell me about it." },
        { title: "Describir personas", topic: "Describing people's appearance and personality", description: "Describe el aspecto y personalidad de las personas.", keyTopics: ["tall", "friendly", "smart", "funny", "kind"], warmupQuestion: "Can you describe your best friend? What do they look like?" },
      ],
      B1: [
        { title: "Mis opiniones", topic: "Expressing and supporting opinions", description: "Comparte y defiende tus opiniones sobre temas cotidianos.", keyTopics: ["I think", "I believe", "in my view", "because"], warmupQuestion: "What do you think about social media? Is it good or bad?" },
        { title: "Experiencias de viaje", topic: "Travel experiences and recommendations", description: "Cuenta viajes y experiencias de otras culturas.", keyTopics: ["I visited", "the food was", "I recommend", "the best part"], warmupQuestion: "Have you traveled somewhere interesting? Tell me about it." },
        { title: "Resolver situaciones", topic: "Problem-solving in everyday situations", description: "Resuelve situaciones cotidianas con confianza en inglés.", keyTopics: ["excuse me", "I have a problem", "could you help", "I need"], warmupQuestion: "Think of a problem you had recently. How did you solve it?" },
        { title: "Conversaciones sociales", topic: "Social conversations and small talk", description: "Mantén conversaciones sociales naturales en inglés.", keyTopics: ["how's it going", "what do you do", "have you seen", "by the way"], warmupQuestion: "If you met a stranger at a party, what would you talk about?" },
        { title: "Describir experiencias", topic: "Describing experiences in detail", description: "Narra experiencias con detalle y emoción.", keyTopics: ["it was amazing", "I felt", "what happened was", "I realized"], warmupQuestion: "Can you tell me about a memorable experience from your life?" },
      ],
      B2: [
        { title: "Ideas complejas", topic: "Expressing complex ideas and abstract concepts", description: "Comunica ideas complejas y abstractas con claridad.", keyTopics: ["hypothetically", "on the other hand", "it depends on", "nuance"], warmupQuestion: "If you could change one thing about the world, what would it be and why?" },
        { title: "Debates cotidianos", topic: "Debating everyday topics", description: "Debate temas de actualidad con argumentos sólidos.", keyTopics: ["I agree because", "however", "research shows", "perspective"], warmupQuestion: "Do you think technology makes our lives better or worse? Defend your position." },
        { title: "Contar historias", topic: "Storytelling and narrative techniques", description: "Cuenta historias de forma atractiva e interesante.", keyTopics: ["once upon a time", "suddenly", "it turned out", "the twist was"], warmupQuestion: "Tell me a funny or surprising story from your life." },
        { title: "Conversaciones fluidas", topic: "Maintaining fluent, natural conversations", description: "Mantén conversaciones fluidas y naturales.", keyTopics: ["that reminds me", "speaking of which", "by the way", "exactly"], warmupQuestion: "Let's have a natural conversation. What's on your mind today?" },
        { title: "Argumentar y persuadir", topic: "Argumentation and persuasion", description: "Argumenta y persuade de manera efectiva en inglés.", keyTopics: ["consider this", "the evidence suggests", "wouldn't you agree", "my point is"], warmupQuestion: "Try to convince me that your city is the best place to live." },
      ],
      C1: [
        { title: "Conversación natural avanzada", topic: "Advanced natural conversation with idioms", description: "Conversa de manera completamente natural con matices culturales.", keyTopics: ["it's a piece of cake", "break the ice", "hit the nail", "under the weather"], warmupQuestion: "Do you know any English idioms? Use one to describe your day." },
        { title: "Matices de opinión", topic: "Nuanced opinions with qualifications", description: "Expresa opiniones con matices y sofisticación.", keyTopics: ["to some extent", "it's debatable", "one could argue", "that said"], warmupQuestion: "What's a topic where your opinion has changed over time?" },
        { title: "Storytelling avanzado", topic: "Advanced storytelling with emotional impact", description: "Domina el arte de contar historias en inglés.", keyTopics: ["plot twist", "character arc", "build suspense", "emotional climax"], warmupQuestion: "Tell me the most interesting story you know — real or fictional." },
        { title: "Fluidez y precisión", topic: "Fluency and precision in word choice", description: "Alcanza un nivel de fluidez y precisión de hablante nativo.", keyTopics: ["precisely", "subtle distinction", "nuance", "eloquent"], warmupQuestion: "How would you describe the difference between happiness and contentment?" },
        { title: "Temas complejos", topic: "Discussing complex topics with sophistication", description: "Aborda temas complejos con vocabulario avanzado y precisión.", keyTopics: ["philosophical", "ethical implications", "paradigm shift", "socioeconomic"], warmupQuestion: "What do you think about artificial intelligence and its impact on society?" },
      ],
    },
    "en-travel": {
      A1: [
        { title: "En el aeropuerto", topic: "Airport vocabulary and phrases", description: "Navega el aeropuerto con frases esenciales.", keyTopics: ["check-in", "boarding pass", "gate", "luggage"], warmupQuestion: "Have you been to an airport? What do you do when you arrive?" },
        { title: "En el hotel", topic: "Hotel check-in and room vocabulary", description: "Comunícate en el hotel de forma básica.", keyTopics: ["reservation", "room", "key", "breakfast"], warmupQuestion: "You just arrived at a hotel. How do you check in?" },
        { title: "Pedir comida", topic: "Ordering food at restaurants", description: "Pide comida en restaurantes con confianza.", keyTopics: ["menu", "I'd like", "the bill please", "water"], warmupQuestion: "You're at a restaurant. What do you want to eat?" },
        { title: "Direcciones básicas", topic: "Basic directions and locations", description: "Pide y entiende indicaciones de dirección.", keyTopics: ["left", "right", "straight", "near", "where is"], warmupQuestion: "How do you ask for directions in English? Try asking me." },
        { title: "Transporte", topic: "Using public transportation", description: "Usa el transporte público en otro país.", keyTopics: ["bus", "taxi", "metro", "how much", "stop"], warmupQuestion: "What kind of transportation do you usually use when traveling?" },
      ],
      A2: [
        { title: "Reservaciones", topic: "Making reservations for hotels and restaurants", description: "Haz reservaciones de hotel, restaurante y actividades.", keyTopics: ["I'd like to book", "for two people", "three nights", "special request"], warmupQuestion: "Practice booking a hotel room. How would you start?" },
        { title: "Compras y souvenirs", topic: "Shopping for souvenirs and local items", description: "Compra recuerdos y artículos locales.", keyTopics: ["how much is this", "too expensive", "discount", "I'll take it"], warmupQuestion: "What kind of souvenirs do you like to buy when traveling?" },
        { title: "Emergencias básicas", topic: "Basic emergency situations", description: "Maneja situaciones de emergencia en otro idioma.", keyTopics: ["help", "doctor", "I lost my passport", "emergency"], warmupQuestion: "What would you say if you lost your passport in another country?" },
        { title: "Actividades turísticas", topic: "Tourist activities and sightseeing", description: "Organiza actividades y visitas turísticas.", keyTopics: ["I'd like to visit", "what time", "how far", "tickets"], warmupQuestion: "What tourist activity would you like to do on your next trip?" },
        { title: "Conocer gente", topic: "Meeting people while traveling", description: "Conecta con personas de otros países.", keyTopics: ["where are you from", "what brings you here", "how long", "nice to meet you"], warmupQuestion: "You meet someone from another country at a hostel. Start a conversation." },
      ],
      B1: [
        { title: "Describir experiencias", topic: "Describing travel experiences in detail", description: "Comparte tus experiencias de viaje de forma detallada.", keyTopics: ["amazing", "disappointing", "I was surprised", "unforgettable"], warmupQuestion: "Tell me about a trip that surprised you. What happened?" },
        { title: "Problemas de viaje", topic: "Handling common travel problems", description: "Resuelve problemas comunes durante viajes.", keyTopics: ["delayed flight", "lost luggage", "wrong room", "refund"], warmupQuestion: "Have you ever had a travel problem? How did you handle it?" },
        { title: "Recomendaciones", topic: "Giving and receiving travel recommendations", description: "Da y recibe recomendaciones de lugares y actividades.", keyTopics: ["you must visit", "don't miss", "I suggest", "the best place for"], warmupQuestion: "If someone visited your country, what would you recommend?" },
        { title: "Diferencias culturales", topic: "Discussing cultural differences", description: "Habla sobre diferencias culturales con apertura.", keyTopics: ["customs", "etiquette", "in my country", "cultural tips"], warmupQuestion: "What cultural difference surprised you when visiting another place?" },
        { title: "Planificar un viaje", topic: "Planning a complete trip", description: "Planifica un viaje completo en inglés.", keyTopics: ["itinerary", "budget", "accommodation", "transportation"], warmupQuestion: "You're planning a week-long trip. Where would you go and why?" },
      ],
      B2: [
        { title: "Viajes de negocios", topic: "Business travel situations", description: "Maneja situaciones de viaje de negocios.", keyTopics: ["purpose of visit", "conference", "client meeting", "expense report"], warmupQuestion: "Have you traveled for work? What was the experience like?" },
        { title: "Negociar y regatear", topic: "Negotiating prices while traveling", description: "Negocia precios en mercados y establecimientos.", keyTopics: ["best price", "I was quoted", "would you accept", "deal"], warmupQuestion: "You're at a market and something is overpriced. How do you negotiate?" },
        { title: "Experiencias inmersivas", topic: "Immersive cultural experiences", description: "Habla sobre experiencias de inmersión cultural.", keyTopics: ["local market", "cooking class", "guided tour", "homestay"], warmupQuestion: "What immersive experience would you love to try while traveling?" },
        { title: "Reseñas y críticas", topic: "Writing travel reviews and critiques", description: "Escribe y da reseñas de lugares y experiencias.", keyTopics: ["I would recommend", "the downside", "overall", "compared to"], warmupQuestion: "Give me a review of the last place you visited, like you're writing for TripAdvisor." },
        { title: "Situaciones complejas", topic: "Complex travel situations", description: "Navega situaciones complejas durante viajes.", keyTopics: ["travel insurance", "visa issues", "medical emergency", "embassy"], warmupQuestion: "What would you do if you had a medical emergency abroad?" },
      ],
      C1: [
        { title: "Conversación con locales", topic: "Deep conversations with local people", description: "Conversa profundamente con locales sobre su cultura.", keyTopics: ["local history", "traditions", "lifestyle", "perspectives"], warmupQuestion: "If you could have dinner with anyone from another culture, who and why?" },
        { title: "Relatos de viaje", topic: "Travel storytelling with vivid descriptions", description: "Narra experiencias de viaje de manera cautivadora.", keyTopics: ["vivid description", "sensory details", "emotional journey", "transformation"], warmupQuestion: "Tell me about a trip that changed your perspective on life." },
        { title: "Guía de viajes", topic: "Being a travel guide for visitors", description: "Actúa como guía y explica lugares con profundidad.", keyTopics: ["historical significance", "local culture", "hidden gems", "context"], warmupQuestion: "Imagine you're a tour guide in your city. Give me the tour." },
        { title: "Viaje y trabajo remoto", topic: "Digital nomad lifestyle", description: "Combina viajes y trabajo remoto en inglés.", keyTopics: ["coworking", "time zones", "work-travel balance", "connectivity"], warmupQuestion: "What do you think about working remotely while traveling the world?" },
        { title: "Reflexiones culturales", topic: "Cultural reflections and growth through travel", description: "Reflexiona sobre el impacto cultural de los viajes.", keyTopics: ["cultural awareness", "biases", "growth", "identity"], warmupQuestion: "How has traveling changed the way you see your own culture?" },
      ],
    },
    "en-interviews": {
      A1: [
        { title: "Presentarme en inglés", topic: "Basic self-introduction for interviews", description: "Haz una presentación básica de ti mismo en inglés.", keyTopics: ["my name is", "I am from", "I study", "I work"], warmupQuestion: "Tell me your name and what you do. Keep it simple." },
        { title: "Información personal", topic: "Sharing personal background", description: "Comparte información personal básica en una entrevista.", keyTopics: ["education", "hometown", "current job", "experience"], warmupQuestion: "Where did you go to school? What did you study?" },
        { title: "Preguntas simples", topic: "Answering simple interview questions", description: "Responde preguntas básicas de entrevista.", keyTopics: ["what is your name", "where are you from", "what do you do"], warmupQuestion: "I'm going to ask you three simple questions. Ready? What is your name?" },
        { title: "Números y fechas", topic: "Numbers and dates in interviews", description: "Usa números y fechas relevantes para entrevistas.", keyTopics: ["years of experience", "start date", "since 2020", "salary"], warmupQuestion: "How many years of work experience do you have?" },
        { title: "Cierre básico", topic: "Basic interview closing phrases", description: "Termina una entrevista de forma profesional básica.", keyTopics: ["thank you", "I have a question", "follow up", "pleasure"], warmupQuestion: "The interview is ending. What do you say to the interviewer?" },
      ],
      A2: [
        { title: "Mi experiencia", topic: "Talking about work experience", description: "Describe tu experiencia laboral de manera simple.", keyTopics: ["I worked at", "my role was", "I was responsible for", "I learned"], warmupQuestion: "Tell me about your last job. What did you do there?" },
        { title: "Mis habilidades", topic: "Describing skills and strengths", description: "Habla sobre tus habilidades y fortalezas.", keyTopics: ["I'm good at", "I have experience in", "my strengths", "I know how to"], warmupQuestion: "What are you good at? Name three skills you have." },
        { title: "Por qué este trabajo", topic: "Explaining interest in a job", description: "Explica por qué te interesa el puesto.", keyTopics: ["I'm interested because", "I want to grow", "I admire", "opportunity"], warmupQuestion: "Why would you want to work at a company like Google or Apple?" },
        { title: "Preguntas al entrevistador", topic: "Questions to ask the interviewer", description: "Haz preguntas inteligentes al entrevistador.", keyTopics: ["responsibilities", "team", "growth opportunities", "culture"], warmupQuestion: "The interviewer says 'Do you have any questions?' What do you ask?" },
        { title: "Disponibilidad", topic: "Discussing availability and logistics", description: "Habla sobre disponibilidad y aspectos prácticos.", keyTopics: ["start date", "salary expectations", "remote", "full-time"], warmupQuestion: "When could you start a new job? Are you looking for remote or in-office?" },
      ],
      B1: [
        { title: "Cuéntame sobre ti", topic: "Structured self-presentation", description: "Da un 'tell me about yourself' estructurado y convincente.", keyTopics: ["career narrative", "key highlights", "passion", "career path"], warmupQuestion: "Tell me about yourself — like you're in a real interview right now." },
        { title: "Fortalezas y debilidades", topic: "Strengths and weaknesses with examples", description: "Responde sobre fortalezas y debilidades con ejemplos reales.", keyTopics: ["strength", "weakness", "growth mindset", "example"], warmupQuestion: "What is your greatest strength? Can you give me a specific example?" },
        { title: "Situaciones pasadas", topic: "Behavioral questions with STAR method", description: "Usa el método STAR para responder preguntas situacionales.", keyTopics: ["situation", "task", "action", "result", "STAR method"], warmupQuestion: "Tell me about a time when you had to solve a difficult problem at work." },
        { title: "Logros y resultados", topic: "Presenting achievements with data", description: "Presenta logros con datos y resultados concretos.", keyTopics: ["I led", "I increased", "I reduced", "I implemented", "results"], warmupQuestion: "What is your proudest professional achievement? What were the results?" },
        { title: "Trabajo en equipo", topic: "Teamwork and collaboration", description: "Habla sobre tu experiencia trabajando en equipo.", keyTopics: ["collaborated with", "my role in the team", "conflict resolution", "leadership"], warmupQuestion: "Tell me about a time you worked well in a team." },
      ],
      B2: [
        { title: "Entrevista completa simulada", topic: "Full mock interview simulation", description: "Practica una entrevista completa de principio a fin.", keyTopics: ["introduction", "body", "closing", "follow-up", "confidence"], warmupQuestion: "Let's do a full mock interview. I'm the hiring manager. Ready? Tell me about yourself." },
        { title: "Preguntas difíciles", topic: "Handling tough interview questions", description: "Maneja preguntas difíciles con confianza y diplomacia.", keyTopics: ["gaps in resume", "why you left", "failure", "salary negotiation"], warmupQuestion: "Why did you leave your last job? Be honest but professional." },
        { title: "Cultura y fit", topic: "Demonstrating culture fit", description: "Demuestra que encajas con la cultura de la empresa.", keyTopics: ["company values", "working style", "motivation", "career goals"], warmupQuestion: "What kind of company culture do you thrive in?" },
        { title: "Negociar oferta", topic: "Negotiating job offers", description: "Negocia una oferta de trabajo en inglés.", keyTopics: ["counter-offer", "benefits", "flexibility", "enthusiasm", "market rate"], warmupQuestion: "You received a job offer but the salary is lower than expected. What do you say?" },
        { title: "Follow-up post entrevista", topic: "Post-interview follow-up", description: "Mantén contacto profesional después de la entrevista.", keyTopics: ["thank you email", "following up", "continued interest", "next steps"], warmupQuestion: "The interview ended well. Write me a follow-up thank you message." },
      ],
      C1: [
        { title: "Entrevista ejecutiva", topic: "Executive-level interview", description: "Prepárate para entrevistas de nivel directivo.", keyTopics: ["leadership philosophy", "strategic thinking", "vision", "transformation"], warmupQuestion: "What is your leadership philosophy? How do you lead a team through change?" },
        { title: "Entrevista en inglés nativo", topic: "Native-level fluency in interviews", description: "Conversa con nivel nativo en una entrevista.", keyTopics: ["idioms", "cultural nuances", "sophisticated vocabulary", "humor"], warmupQuestion: "Let's have a casual but professional conversation, like two native speakers." },
        { title: "Presentación de caso", topic: "Case study presentation and defense", description: "Presenta y defiende análisis de casos empresariales.", keyTopics: ["problem analysis", "recommendations", "data-driven", "Q&A"], warmupQuestion: "I'll give you a business problem. You have 2 minutes to analyze and present a solution." },
        { title: "Panel de entrevistas", topic: "Managing panel interviews", description: "Maneja entrevistas con panel de entrevistadores.", keyTopics: ["multiple interviewers", "reading the room", "eye contact", "engagement"], warmupQuestion: "You're facing three interviewers. How do you engage all of them?" },
        { title: "Feedback y mejora", topic: "Handling feedback and rejection professionally", description: "Maneja el feedback y la mejora continua con madurez profesional.", keyTopics: ["feedback", "rejection", "improvement", "growth mindset", "resilience"], warmupQuestion: "You didn't get the job. How do you ask for feedback professionally?" },
      ],
    },
  },
  SPANISH: {
    "es-everyday": {
      A1: [
        { title: "Saludos y presentaciones", topic: "Greetings and introductions in Spanish", description: "Aprende a saludar y presentarte en español.", keyTopics: ["hola", "me llamo", "mucho gusto", "¿cómo estás?"], warmupQuestion: "¡Hola! ¿Cómo te llamas? ¿De dónde eres?" },
        { title: "La familia", topic: "Family members and relationships", description: "Vocabulario de familia y relaciones.", keyTopics: ["mamá", "papá", "hermano", "hermana", "abuelo"], warmupQuestion: "¿Tienes una familia grande? Cuéntame sobre ella." },
        { title: "Comida y bebida", topic: "Food, drinks and meals", description: "Habla sobre comidas y bebidas básicas.", keyTopics: ["desayuno", "almuerzo", "cena", "agua", "café"], warmupQuestion: "¿Qué desayunaste hoy? ¿Te gusta el café?" },
        { title: "Números y días", topic: "Numbers, days of the week, months", description: "Usa números y vocabulario de tiempo.", keyTopics: ["uno", "lunes", "enero", "hoy", "mañana"], warmupQuestion: "¿Qué día es hoy? ¿Cuántos años tienes?" },
        { title: "Mi casa", topic: "Rooms and objects at home", description: "Describe tu casa y los objetos en ella.", keyTopics: ["cocina", "baño", "sala", "cama", "mesa"], warmupQuestion: "¿Cuántos cuartos tiene tu casa? ¿Cuál es tu favorito?" },
      ],
    },
    "es-business": { A1: [{ title: "Presentaciones profesionales", topic: "Professional introductions in Spanish", description: "Preséntate en un contexto laboral.", keyTopics: ["empresa", "puesto", "oficina", "compañero"], warmupQuestion: "¿En qué empresa trabajas? ¿Cuál es tu puesto?" }] },
    "es-culture": { A1: [{ title: "Música latina", topic: "Latin music and artists", description: "Habla sobre música latinoamericana.", keyTopics: ["salsa", "reggaetón", "cumbia", "artista"], warmupQuestion: "¿Qué tipo de música latina te gusta? ¿Tienes un artista favorito?" }] },
    "es-travel": { A1: [{ title: "En el aeropuerto", topic: "Airport vocabulary in Spanish", description: "Navega el aeropuerto en español.", keyTopics: ["vuelo", "equipaje", "pasaporte", "puerta"], warmupQuestion: "¿Has viajado a un país hispanohablante? ¿Adónde?" }] },
  },
  PORTUGUESE: {
    "pt-brazilian": {
      A1: [
        { title: "Cumprimentos básicos", topic: "Basic greetings in Brazilian Portuguese", description: "Aprende a saludar en portugués brasileño.", keyTopics: ["olá", "tudo bem", "meu nome é", "prazer"], warmupQuestion: "Olá! Qual é o seu nome? De onde você é?" },
        { title: "Minha família", topic: "Family vocabulary in Portuguese", description: "Vocabulario de familia en portugués.", keyTopics: ["mãe", "pai", "irmão", "irmã", "avó"], warmupQuestion: "Você tem irmãos? Me conte sobre sua família." },
        { title: "Comidas e bebidas", topic: "Food and drinks in Portuguese", description: "Habla sobre comidas y bebidas.", keyTopics: ["café da manhã", "almoço", "jantar", "água", "suco"], warmupQuestion: "O que você comeu hoje no café da manhã?" },
        { title: "Números e dias", topic: "Numbers and days in Portuguese", description: "Usa números y días de la semana.", keyTopics: ["um", "segunda-feira", "janeiro", "hoje"], warmupQuestion: "Que dia é hoje? Você pode contar até dez em português?" },
        { title: "Minha rotina", topic: "Daily routine in Portuguese", description: "Describe tu rutina diaria.", keyTopics: ["acordar", "tomar banho", "trabalhar", "dormir"], warmupQuestion: "A que horas você acorda todos os dias?" },
      ],
    },
    "pt-european": { A1: [{ title: "Cumprimentos", topic: "Greetings in European Portuguese", description: "Saludos en portugués europeo.", keyTopics: ["bom dia", "como está", "obrigado", "por favor"], warmupQuestion: "Bom dia! Como está? Fale-me um pouco sobre si." }] },
    "pt-business": { A1: [{ title: "No escritório", topic: "Office vocabulary in Portuguese", description: "Vocabulario de oficina en portugués.", keyTopics: ["escritório", "reunião", "chefe", "projeto"], warmupQuestion: "Onde você trabalha? O que faz no dia a dia?" }] },
    "pt-travel": { A1: [{ title: "No aeroporto", topic: "Airport in Portuguese", description: "Navega el aeropuerto en portugués.", keyTopics: ["voo", "bagagem", "passaporte", "embarque"], warmupQuestion: "Você já viajou para o Brasil ou Portugal?" }] },
  },
  FRENCH: {
    "fr-everyday": {
      A1: [
        { title: "Salutations de base", topic: "Basic French greetings", description: "Aprende a saludar en francés.", keyTopics: ["bonjour", "je m'appelle", "enchanté", "comment allez-vous"], warmupQuestion: "Bonjour! Comment vous appelez-vous? D'où venez-vous?" },
        { title: "Ma famille", topic: "Family vocabulary in French", description: "Vocabulario de familia en francés.", keyTopics: ["mère", "père", "frère", "sœur", "grand-père"], warmupQuestion: "Avez-vous une grande famille? Parlez-moi d'elle." },
        { title: "La nourriture", topic: "Food and meals in French", description: "Habla sobre comidas en francés.", keyTopics: ["petit-déjeuner", "déjeuner", "dîner", "eau", "pain"], warmupQuestion: "Qu'est-ce que vous avez mangé ce matin?" },
        { title: "Les chiffres", topic: "Numbers and counting in French", description: "Números y conteo en francés.", keyTopics: ["un", "deux", "lundi", "janvier", "aujourd'hui"], warmupQuestion: "Quel jour sommes-nous? Pouvez-vous compter jusqu'à dix?" },
        { title: "Ma maison", topic: "Home and rooms in French", description: "Describe tu casa en francés.", keyTopics: ["cuisine", "chambre", "salon", "salle de bain"], warmupQuestion: "Combien de pièces a votre maison? Quelle est votre pièce préférée?" },
      ],
    },
    "fr-business": { A1: [{ title: "Au bureau", topic: "Office French", description: "Vocabulario de oficina en francés.", keyTopics: ["bureau", "réunion", "collègue", "projet"], warmupQuestion: "Où travaillez-vous? Quel est votre poste?" }] },
    "fr-culture": { A1: [{ title: "Le cinéma français", topic: "French cinema", description: "Habla sobre cine francés.", keyTopics: ["film", "acteur", "réalisateur", "comédie"], warmupQuestion: "Aimez-vous le cinéma français? Quel est votre film préféré?" }] },
    "fr-african": { A1: [{ title: "Le français en Afrique", topic: "French in Africa", description: "El francés en el continente africano.", keyTopics: ["Sénégal", "Côte d'Ivoire", "Cameroun", "culture"], warmupQuestion: "Savez-vous quels pays africains parlent français?" }] },
  },
}
