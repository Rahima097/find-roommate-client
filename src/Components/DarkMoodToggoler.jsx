const DarkMoodToggoler = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="btn btn-outline btn-primary"
    >
      {darkMode ? '🌙 ' : '🔆 '}
    </button>
  );
};

export default DarkMoodToggoler;
