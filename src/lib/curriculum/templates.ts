export interface LessonTemplate {
  title: string
  topic: string
  description: string
}

type ObjectiveSlug = "business" | "general" | "travel" | "interviews"
type Level = "A1" | "A2" | "B1" | "B2" | "C1"

export const CURRICULUM: Record<ObjectiveSlug, Record<Level, LessonTemplate[]>> = {
  business: {
    A1: [
      { title: "Presentaciones básicas", topic: "Basic professional introductions: name, job title, company", description: "Aprende a presentarte en un contexto laboral." },
      { title: "Puestos de trabajo", topic: "Job titles and roles: manager, engineer, assistant, director", description: "Vocabulario de cargos y posiciones en la empresa." },
      { title: "Vocabulario de oficina", topic: "Office objects and spaces: desk, meeting room, computer, printer", description: "Nombra los objetos y lugares más comunes de una oficina." },
      { title: "Saludar a colegas", topic: "Greeting coworkers: good morning, how are you, nice to meet you", description: "Frases para saludar a compañeros de trabajo." },
      { title: "Números y fechas", topic: "Numbers, dates and times in a business context", description: "Usa números, fechas y horas en situaciones laborales." },
    ],
    A2: [
      { title: "Tareas diarias", topic: "Describing daily work tasks: I attend meetings, I send emails, I prepare reports", description: "Describe tus actividades laborales cotidianas." },
      { title: "Horarios y agendas", topic: "Talking about schedules: what time is the meeting? I have a call at 3pm", description: "Habla sobre horarios y citas de trabajo." },
      { title: "Reuniones simples", topic: "Basic meeting phrases: shall we start? any questions? let's move on", description: "Frases útiles para participar en reuniones básicas." },
      { title: "Preguntas en el trabajo", topic: "Asking and answering basic work questions: where is? can you help me? what does it mean?", description: "Haz y responde preguntas comunes en el trabajo." },
      { title: "Correos electrónicos simples", topic: "Writing simple business emails: subject, greeting, body, closing", description: "Estructura y vocabulario para correos laborales sencillos." },
    ],
    B1: [
      { title: "Participar en reuniones", topic: "Contributing to meetings: I think, in my opinion, I agree/disagree, could we discuss...", description: "Expresa opiniones y participa activamente en reuniones." },
      { title: "Dar actualizaciones", topic: "Giving project updates: we completed, we're working on, the next step is, we encountered a problem", description: "Reporta el avance de proyectos de forma clara." },
      { title: "Explicar ideas", topic: "Explaining concepts and ideas clearly: the reason is, what I mean is, for example, in other words", description: "Articula ideas y conceptos de manera comprensible." },
      { title: "Conversaciones profesionales", topic: "Professional conversations: asking about roles, discussing goals, giving feedback", description: "Mantén conversaciones fluidas en contextos profesionales." },
      { title: "Problemas en el trabajo", topic: "Describing and solving work problems: there's an issue, we need to fix, I suggest, what if we...", description: "Comunica y propone soluciones a problemas laborales." },
    ],
    B2: [
      { title: "Presentar ideas", topic: "Presenting ideas persuasively: I'd like to propose, the key benefit is, let me explain why", description: "Presenta propuestas e ideas con claridad y persuasión." },
      { title: "Opiniones en reuniones", topic: "Expressing and defending opinions: I strongly believe, the data shows, have you considered, with all due respect", description: "Defiende tus puntos de vista en discusiones profesionales." },
      { title: "Negociación básica", topic: "Negotiation language: what if we, I can offer, that's not feasible, can we find a middle ground", description: "Usa lenguaje de negociación en situaciones laborales." },
      { title: "Situaciones laborales complejas", topic: "Handling complex work situations: conflicts, difficult conversations, giving bad news", description: "Navega situaciones laborales difíciles con confianza." },
      { title: "Reportes y análisis", topic: "Discussing reports and data: the results indicate, compared to last quarter, the trend shows", description: "Presenta y discute datos y resultados de manera profesional." },
    ],
    C1: [
      { title: "Discusiones avanzadas", topic: "Advanced business discussions: strategic planning, market analysis, organizational change", description: "Participa en discusiones de negocios a nivel estratégico." },
      { title: "Persuasión e influencia", topic: "Persuasive communication: framing arguments, addressing objections, building consensus", description: "Usa técnicas avanzadas de persuasión en inglés." },
      { title: "Comunicación de liderazgo", topic: "Leadership communication: motivating teams, vision statements, difficult decisions", description: "Comunícate como líder con impacto y claridad." },
      { title: "Presentaciones ejecutivas", topic: "Executive presentations: structuring, storytelling with data, Q&A handling", description: "Da presentaciones ejecutivas de alto impacto." },
      { title: "Networking avanzado", topic: "Advanced networking: building relationships, elevator pitches, conference conversations", description: "Construye relaciones profesionales en inglés a nivel avanzado." },
    ],
  },
  general: {
    A1: [
      { title: "Presentaciones personales", topic: "Personal introductions: name, age, country, family", description: "Preséntate y habla sobre ti de forma básica." },
      { title: "Mi familia", topic: "Talking about family members: parents, siblings, relatives", description: "Describe a tu familia con vocabulario sencillo." },
      { title: "Rutina diaria", topic: "Daily routine: wake up, have breakfast, go to work, watch TV", description: "Describe tus actividades diarias más comunes." },
      { title: "Gustos y preferencias", topic: "Likes and dislikes: I like, I don't like, my favorite, I prefer", description: "Expresa tus gustos y preferencias personales." },
      { title: "Números y colores", topic: "Numbers, colors, and basic descriptions", description: "Usa números y colores en conversaciones cotidianas." },
    ],
    A2: [
      { title: "Hobbies y tiempo libre", topic: "Hobbies: I enjoy, I spend my weekends, I'm interested in, I play/watch/read", description: "Habla sobre tus pasatiempos y actividades de ocio." },
      { title: "Planes y futuro", topic: "Making plans: I'm going to, I want to, I'm planning, this weekend I will", description: "Habla sobre planes futuros y proyectos personales." },
      { title: "Ir de compras", topic: "Shopping: how much is it? do you have? I'd like, that's too expensive", description: "Maneja situaciones de compras en inglés." },
      { title: "Experiencias pasadas", topic: "Past experiences: I went, I saw, I ate, did you ever, last year I", description: "Cuenta experiencias y eventos pasados." },
      { title: "Describir personas", topic: "Describing people: appearance, personality, character traits", description: "Describe el aspecto y personalidad de las personas." },
    ],
    B1: [
      { title: "Mis opiniones", topic: "Expressing opinions: I think, I believe, in my view, what do you think about", description: "Comparte y defiende tus opiniones sobre temas cotidianos." },
      { title: "Experiencias de viaje", topic: "Travel experiences: I visited, the food was, the best part was, I recommend", description: "Cuenta viajes y experiencias de otras culturas." },
      { title: "Resolver situaciones", topic: "Problem-solving: excuse me, I have a problem, could you help me, it seems like", description: "Resuelve situaciones cotidianas con confianza en inglés." },
      { title: "Conversaciones sociales", topic: "Social conversations: small talk, asking about someone's day, talking about news", description: "Mantén conversaciones sociales naturales en inglés." },
      { title: "Describir experiencias", topic: "Describing experiences in detail: setting the scene, expressing feelings, what happened next", description: "Narra experiencias con detalle y emoción." },
    ],
    B2: [
      { title: "Ideas complejas", topic: "Expressing complex ideas: nuanced opinions, hypothetical situations, abstract concepts", description: "Comunica ideas complejas y abstractas con claridad." },
      { title: "Debates cotidianos", topic: "Debating everyday topics: environment, technology, society, work-life balance", description: "Debate temas de actualidad con argumentos sólidos." },
      { title: "Contar historias", topic: "Storytelling: narrative techniques, building suspense, descriptive language", description: "Cuenta historias de forma atractiva e interesante." },
      { title: "Conversaciones fluidas", topic: "Fluent conversations: natural transitions, showing interest, handling misunderstandings", description: "Mantén conversaciones fluidas y naturales." },
      { title: "Argumentar y persuadir", topic: "Argumentation: making a case, using evidence, acknowledging other views", description: "Argumenta y persuade de manera efectiva en inglés." },
    ],
    C1: [
      { title: "Conversación natural avanzada", topic: "Advanced natural conversation: idioms, humor, cultural references", description: "Conversa de manera completamente natural con matices culturales." },
      { title: "Matices de opinión", topic: "Nuanced opinions: qualifying statements, expressing doubt, acknowledging complexity", description: "Expresa opiniones con matices y sofisticación." },
      { title: "Storytelling avanzado", topic: "Advanced storytelling: character development, plot twists, emotional impact", description: "Domina el arte de contar historias en inglés." },
      { title: "Fluidez y precisión", topic: "Fluency and precision: choosing exact words, avoiding repetition, varied vocabulary", description: "Alcanza un nivel de fluidez y precisión de hablante nativo." },
      { title: "Temas complejos", topic: "Discussing complex topics: philosophy, politics, science, culture with sophistication", description: "Aborda temas complejos con vocabulario avanzado y precisión." },
    ],
  },
  travel: {
    A1: [
      { title: "En el aeropuerto", topic: "Airport: check-in, boarding pass, gate, luggage, customs", description: "Navega el aeropuerto con frases esenciales." },
      { title: "En el hotel", topic: "Hotel: check-in, room, reservation, elevator, breakfast", description: "Comunícate en el hotel de forma básica." },
      { title: "Pedir comida", topic: "Ordering food: menu, I'd like, can I have, the bill please", description: "Pide comida en restaurantes con confianza." },
      { title: "Direcciones básicas", topic: "Basic directions: left, right, straight, near, far, where is", description: "Pide y entiende indicaciones de dirección." },
      { title: "Transporte", topic: "Transportation: bus, taxi, metro, how much, where does it go", description: "Usa el transporte público en otro país." },
    ],
    A2: [
      { title: "Reservaciones", topic: "Making reservations: I'd like to book, for two people, for three nights, special requests", description: "Haz reservaciones de hotel, restaurante y actividades." },
      { title: "Compras y souvenirs", topic: "Shopping for souvenirs: how much, too expensive, do you have, I'll take it", description: "Compra recuerdos y artículos locales." },
      { title: "Emergencias básicas", topic: "Basic emergencies: help, I need a doctor, I lost my passport, call the police", description: "Maneja situaciones de emergencia en otro idioma." },
      { title: "Actividades turísticas", topic: "Tourist activities: I'd like to visit, what time does it open, how far is it", description: "Organiza actividades y visitas turísticas." },
      { title: "Conocer gente", topic: "Meeting people while traveling: where are you from, what do you do, what brings you here", description: "Conecta con personas de otros países." },
    ],
    B1: [
      { title: "Describir experiencias", topic: "Describing travel experiences: amazing, disappointing, unexpected, I was surprised by", description: "Comparte tus experiencias de viaje de forma detallada." },
      { title: "Problemas de viaje", topic: "Travel problems: delayed flight, lost luggage, wrong room, overcharged", description: "Resuelve problemas comunes durante viajes." },
      { title: "Recomendaciones", topic: "Giving travel recommendations: you must visit, don't miss, I suggest, the best place for", description: "Da y recibe recomendaciones de lugares y actividades." },
      { title: "Diferencias culturales", topic: "Cultural differences: customs, etiquette, what to expect, cultural tips", description: "Habla sobre diferencias culturales con apertura." },
      { title: "Planificar un viaje", topic: "Planning a trip: itinerary, budget, accommodation, what to pack", description: "Planifica un viaje completo en inglés." },
    ],
    B2: [
      { title: "Viajes de negocios", topic: "Business travel: purpose of visit, conference, trade show, client meetings", description: "Maneja situaciones de viaje de negocios." },
      { title: "Negociar y regatear", topic: "Negotiating prices: is that your best price, I was quoted, would you accept", description: "Negocia precios en mercados y establecimientos." },
      { title: "Experiencias inmersivas", topic: "Immersive experiences: local markets, cooking classes, guided tours, homestays", description: "Habla sobre experiencias de inmersión cultural." },
      { title: "Reseñas y críticas", topic: "Reviews and critiques: I would recommend, the downside was, overall, compared to other", description: "Escribe y da reseñas de lugares y experiencias." },
      { title: "Situaciones complejas", topic: "Complex situations: travel insurance, visa issues, medical emergencies abroad", description: "Navega situaciones complejas durante viajes." },
    ],
    C1: [
      { title: "Conversación con locales", topic: "Deep conversations with locals: history, culture, lifestyle, current events", description: "Conversa profundamente con locales sobre su cultura." },
      { title: "Relatos de viaje", topic: "Travel storytelling: crafting narratives, vivid descriptions, emotional journeys", description: "Narra experiencias de viaje de manera cautivadora." },
      { title: "Guía de viajes", topic: "Being a travel guide: explaining history, culture, giving context, answering questions", description: "Actúa como guía y explica lugares con profundidad." },
      { title: "Viaje y trabajo remoto", topic: "Digital nomad: finding coworking, internet access, time zones, work-travel balance", description: "Combina viajes y trabajo remoto en inglés." },
      { title: "Reflexiones culturales", topic: "Cultural reflections: comparing cultures, biases, growth through travel, identity", description: "Reflexiona sobre el impacto cultural de los viajes." },
    ],
  },
  interviews: {
    A1: [
      { title: "Presentarme en inglés", topic: "Self-introduction: name, experience level, why you're learning English for interviews", description: "Haz una presentación básica de ti mismo en inglés." },
      { title: "Información personal", topic: "Personal information: education, hometown, current job, basic background", description: "Comparte información personal básica en una entrevista." },
      { title: "Preguntas simples", topic: "Simple interview questions: what is your name, where are you from, what do you do", description: "Responde preguntas básicas de entrevista." },
      { title: "Números y fechas", topic: "Numbers, dates and times in an interview: experience years, start dates, salary basics", description: "Usa números y fechas relevantes para entrevistas." },
      { title: "Cierre básico", topic: "Basic interview closing: thank you, I have a question, how do I follow up", description: "Termina una entrevista de forma profesional básica." },
    ],
    A2: [
      { title: "Mi experiencia", topic: "Talking about work experience: I worked at, my role was, I was responsible for", description: "Describe tu experiencia laboral de manera simple." },
      { title: "Mis habilidades", topic: "Skills: I'm good at, I have experience in, I know how to, my strengths are", description: "Habla sobre tus habilidades y fortalezas." },
      { title: "Por qué este trabajo", topic: "Why this job: I'm interested because, I want to grow, I admire your company", description: "Explica por qué te interesa el puesto." },
      { title: "Preguntas al entrevistador", topic: "Questions for the interviewer: what are the responsibilities, what is the team like, growth opportunities", description: "Haz preguntas inteligentes al entrevistador." },
      { title: "Disponibilidad", topic: "Availability and logistics: start date, salary expectations basics, remote or in-office", description: "Habla sobre disponibilidad y aspectos prácticos." },
    ],
    B1: [
      { title: "Cuéntame sobre ti", topic: "Tell me about yourself: structured self-presentation, career narrative, key highlights", description: "Da un 'tell me about yourself' estructurado y convincente." },
      { title: "Fortalezas y debilidades", topic: "Strengths and weaknesses: examples, growth mindset, framing weaknesses positively", description: "Responde sobre fortalezas y debilidades con ejemplos reales." },
      { title: "Situaciones pasadas", topic: "Behavioral questions: tell me about a time when, STAR method, specific examples", description: "Usa el método STAR para responder preguntas situacionales." },
      { title: "Logros y resultados", topic: "Achievements: I led a project that, I increased, I reduced, I implemented", description: "Presenta logros con datos y resultados concretos." },
      { title: "Trabajo en equipo", topic: "Teamwork: I collaborated with, my role in the team was, conflict resolution, leadership", description: "Habla sobre tu experiencia trabajando en equipo." },
    ],
    B2: [
      { title: "Entrevista completa simulada", topic: "Full mock interview: complete interview simulation from intro to closing", description: "Practica una entrevista completa de principio a fin." },
      { title: "Preguntas difíciles", topic: "Tough questions: gaps in resume, why you left, failure, salary negotiation", description: "Maneja preguntas difíciles con confianza y diplomacia." },
      { title: "Cultura y fit", topic: "Culture fit: company values, working style, motivation, career goals", description: "Demuestra que encajas con la cultura de la empresa." },
      { title: "Negociar oferta", topic: "Negotiating offers: counter-offer, benefits, flexibility, expressing enthusiasm", description: "Negocia una oferta de trabajo en inglés." },
      { title: "Follow-up post entrevista", topic: "Post-interview follow-up: thank you email, checking in, expressing continued interest", description: "Mantén contacto profesional después de la entrevista." },
    ],
    C1: [
      { title: "Entrevista ejecutiva", topic: "Executive interview: leadership philosophy, strategic thinking, vision, transformation", description: "Prepárate para entrevistas de nivel directivo." },
      { title: "Entrevista en inglés nativo", topic: "Native-level interview: idioms, cultural nuances, humor, sophisticated vocabulary", description: "Conversa con nivel nativo en una entrevista." },
      { title: "Presentación de caso", topic: "Case study presentation: problem analysis, recommendations, Q&A handling", description: "Presenta y defiende análisis de casos empresariales." },
      { title: "Panel de entrevistas", topic: "Panel interviews: managing multiple interviewers, reading the room, different personalities", description: "Maneja entrevistas con panel de entrevistadores." },
      { title: "Feedback y mejora", topic: "Asking for feedback, handling rejection professionally, iterating and improving", description: "Maneja el feedback y la mejora continua con madurez profesional." },
    ],
  },
}
