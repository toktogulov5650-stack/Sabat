import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ContactsContent } from "./ContactsContent";

export const metadata: Metadata = { title: "Контакты", description: "Свяжитесь с общественным фондом Sabat." };

export default function ContactsPage() {
  return <><Header /><ContactsContent /><Footer /></>;
}
