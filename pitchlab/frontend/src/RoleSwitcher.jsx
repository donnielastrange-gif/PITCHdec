function RoleSwitcher({ role, setRole }) {
  function switchRole() {
    if (role === "Creator") {
      setRole("Reviewer");
    } else {
      setRole("Creator");
    }
  }

  return (
    <div>
      <h2>You are currently: {role}</h2>
      <button onClick={switchRole}>Switch Role</button>
    </div>
  );
}

export default RoleSwitcher;