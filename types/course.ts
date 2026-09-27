export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  price: string;
  discount_price: string;
  level: string;
  status: string;
  is_free: boolean;
  instructor_name: string;
  created_at: string;
  lessons_count?: number;
  duration_hours?: number;
}

export interface CourseApiResponse {
  message: string;
  courses: Course[];
}
