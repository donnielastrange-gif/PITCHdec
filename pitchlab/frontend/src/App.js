import { useState } from "react";
import RoleSwitcher from "./RoleSwitcher";
import PitchForm from "./PitchForm";
import PitchCard from "./PitchCard";

function App() {
  const [role, setRole] = useState("Creator");
  const [pitches, setPitches] = useState([]);

  function handleSubmit(newPitch) {
    setPitches([...pitches, newPitch]);
  }

  return (
    <div>
      <h1>PITCHdec</h1>
      <RoleSwitcher role={role} setRole={setRole} />
      {role === "Creator" && <PitchForm onSubmit={handleSubmit} />}
      {pitches.map((pitch, index) => (
        <PitchCard
          key={index}
          title={pitch.title}
          description={pitch.description}
          category={pitch.category}
          visibility={pitch.visibility}
        />
      ))}
    </div>
  );
}

export default App;