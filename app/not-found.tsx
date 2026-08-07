import Link from "next/link";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="not-found">
        <div className="container">
          <span className="error-code">404</span>
          <h1>Такой страницы нет</h1>
          <p>Возможно, ссылка устарела или адрес был введён с ошибкой.</p>
          <Link className="button button-primary" href="/">
            Вернуться на главную <span aria-hidden="true">→</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
