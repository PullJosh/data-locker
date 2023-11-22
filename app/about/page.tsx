export const metadata = {
  title: "Admin | Data Locker",
};

export default function About() {
  return (
    <div className="prose py-8">
      <h1>About Data Locker</h1>

      <h2>FAQ</h2>
      <h3>What can I use this for?</h3>
      <p>
        If you need to store a small amount of data online, this may be the tool
        for you. For example, you could:
      </p>
      <ul>
        <li>Store a leaderboard of high scores for a game</li>
        <li>Store your blog posts as markdown</li>
        <li>Count the number of people who have visited your website</li>
      </ul>
      <p>
        You can view or edit your data by hand, but you can also access the data
        from your code.
      </p>

      <h3>Is this secure?</h3>
      <p>
        No! All your data will be publicly viewable by anyone. And anyone who
        has the password will be able to edit, delete, or replace all your data
        at any time.
      </p>
      <p>
        As a general rule of thumb, only use this for small projects that will
        be used by people you trust. If you're making something big or
        important, you almost certainly want to use a real database instead.
      </p>
    </div>
  );
}
