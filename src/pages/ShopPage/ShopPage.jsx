import styles from "./ShopPage.module.css";

function ShopPage() {
  return (
    <main className={styles.main}>
      <aside className={styles.aside}>
        <ul>
          <li>All</li>
          <li>Action</li>
          <li>Adventure</li>
          <li>Simulation</li>
        </ul>
      </aside>
      <section>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis molestias optio quis ullam dolores
          assumenda distinctio necessitatibus soluta et, doloribus nulla explicabo quidem nesciunt
          exercitationem cupiditate iste voluptatibus aperiam architecto!
        </p>
      </section>
    </main>
  );
}

export default ShopPage;
