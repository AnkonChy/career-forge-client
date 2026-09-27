import { axiosPublic } from "@/app/hooks/useAxiosPublic";
import { Course, CourseApiResponse } from "@/types/course";

export const FALLBACK_COURSES: Course[] = [
  {
    id: 1,
    title: "AI Engineering with Python",
    slug: "ai-engineering-with-python",
    description: "Learn to design and build production-ready AI applications using Python, machine learning, and modern AI tools.",
    thumbnail: "ai-engineering-python.jpg",
    price: "2500",
    discount_price: "1999",
    level: "Intermediate",
    status: "published",
    is_free: false,
    instructor_name: "Ankon Chowdhury",
    created_at: "2026-09-24T06:43:36.607Z",
    lessons_count: 48,
    duration_hours: 64.5,
  },
  {
    id: 2,
    title: "Generative AI Application Development",
    slug: "generative-ai-application-development",
    description: "Build real-world generative AI applications using large language models, AI APIs, embeddings, and vector databases.",
    thumbnail: "generative-ai-development.jpg",
    price: "3000",
    discount_price: "2299",
    level: "Intermediate",
    status: "published",
    is_free: false,
    instructor_name: "Ankon Chowdhury",
    created_at: "2026-09-24T06:43:36.607Z",
    lessons_count: 56,
    duration_hours: 72.0,
  },
  {
    id: 3,
    title: "Large Language Model Engineering",
    slug: "large-language-model-engineering",
    description: "Explore LLM architecture, prompt engineering, embeddings, fine-tuning, evaluation, and application development.",
    thumbnail: "llm-engineering.jpg",
    price: "3500",
    discount_price: "2799",
    level: "Advanced",
    status: "published",
    is_free: false,
    instructor_name: "Ankon Chowdhury",
    created_at: "2026-09-24T06:43:36.607Z",
    lessons_count: 62,
    duration_hours: 88.5,
  },
  {
    id: 4,
    title: "Building RAG Applications with LLMs",
    slug: "building-rag-applications-with-llms",
    description: "Learn to build retrieval-augmented generation systems using document processing, embeddings, vector search, and LLMs.",
    thumbnail: "rag-applications.jpg",
    price: "2800",
    discount_price: "2199",
    level: "Advanced",
    status: "published",
    is_free: false,
    instructor_name: "Ankon Chowdhury",
    created_at: "2026-09-24T06:43:36.607Z",
    lessons_count: 42,
    duration_hours: 58.0,
  },
  {
    id: 5,
    title: "Machine Learning Engineering",
    slug: "machine-learning-engineering",
    description: "Master the machine learning lifecycle including data preparation, model development, evaluation, deployment, and monitoring.",
    thumbnail: "machine-learning-engineering.jpg",
    price: "3200",
    discount_price: "2499",
    level: "Advanced",
    status: "published",
    is_free: false,
    instructor_name: "Ankon Chowdhury",
    created_at: "2026-09-24T06:43:36.607Z",
    lessons_count: 70,
    duration_hours: 95.0,
  },
  {
    id: 6,
    title: "AI Agents and Agentic Systems",
    slug: "ai-agents-and-agentic-systems",
    description: "Learn to build AI agents that can reason, use tools, interact with APIs, and execute multi-step tasks.",
    thumbnail: "ai-agents.jpg",
    price: "3000",
    discount_price: "2399",
    level: "Advanced",
    status: "published",
    is_free: false,
    instructor_name: "Ankon Chowdhury",
    created_at: "2026-09-24T06:43:36.607Z",
    lessons_count: 38,
    duration_hours: 52.0,
  },
  {
    id: 7,
    title: "Computer Vision with Deep Learning",
    slug: "computer-vision-with-deep-learning",
    description: "Build computer vision solutions using deep learning, image processing, object detection, and modern vision models.",
    thumbnail: "computer-vision.jpg",
    price: "2700",
    discount_price: "2099",
    level: "Advanced",
    status: "published",
    is_free: false,
    instructor_name: "Ankon Chowdhury",
    created_at: "2026-09-24T06:43:36.607Z",
    lessons_count: 50,
    duration_hours: 68.0,
  },
  {
    id: 8,
    title: "Production AI and MLOps",
    slug: "production-ai-and-mlops",
    description: "Learn how to deploy, evaluate, monitor, and maintain reliable AI and machine learning systems in production.",
    thumbnail: "production-ai-mlops.jpg",
    price: "3500",
    discount_price: "2799",
    level: "Advanced",
    status: "published",
    is_free: false,
    instructor_name: "Ankon Chowdhury",
    created_at: "2026-09-24T06:43:36.607Z",
    lessons_count: 46,
    duration_hours: 60.5,
  },
];

// Helper to provide realistic lesson and hours metrics if not present in API
export const enrichCourse = (course: Course, index: number): Course => {
  const defaultLessons = [48, 56, 62, 42, 70, 38, 50, 46];
  const defaultHours = [64.5, 72.0, 88.5, 58.0, 95.0, 52.0, 68.0, 60.5];

  return {
    ...course,
    lessons_count: course.lessons_count ?? defaultLessons[index % defaultLessons.length],
    duration_hours: course.duration_hours ?? defaultHours[index % defaultHours.length],
  };
};

export const fetchCourses = async (): Promise<Course[]> => {
  try {
    const response = await axiosPublic.get<CourseApiResponse>("/api/course");
    if (response.data && Array.isArray(response.data.courses)) {
      return response.data.courses.map((c, i) => enrichCourse(c, i));
    }
    return FALLBACK_COURSES;
  } catch (error) {
    console.error("Error fetching courses from API, using fallback data:", error);
    return FALLBACK_COURSES;
  }
};
