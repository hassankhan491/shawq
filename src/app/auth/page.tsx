// src/app/auth/page.tsx
import { redirect } from 'next/navigation';

// Agar koi /auth par aaye, toh automatically /auth/login par bhej do
export default function AuthPage() {
  redirect('/auth/login');
}