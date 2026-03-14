import { useState } from "react";

function PitchForm({ onSubmit }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [visibility, setVisibility] = useState("Public");

    function handleSubmit() {
        if (title === "" || description === "" || category === "") {
            alert("Please fill in all fields.")
            return;
        }
        onSubmit({ title, description, category, visibility });
        setTitle("");
        setDescription("");
    }
    return (
        <div>
            <h2>Submit Your Pitch</h2>

            <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Describe your idea..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select a category...</option>
                <option>Tech</option>
                <option>Health</option>
                <option>Education</option>
                <option>Finance</option>
                <option>Other</option>

            </select>
            <div>
                <label>
                    <input
                        type="radio"
                        value="Public"
                        checked={visibility === "Public"}
                        onChange={() => setVisibility("Public")}
                    />
                    Public
                </label>
                <label>
                    <input
                        type="radio"
                        value="Private"
                        checked={visibility === "Private"}
                        onChange={() => setVisibility("Private")}
                    />
                    Private
                </label>
            </div>

            <button onClick={handleSubmit}>Submit Pitch</button>
        </div>
    );
}

export default PitchForm;