function PitchCard({ title, description, category, visibility }) {
    return (
        <div>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>Category: {category}</p>
            <p>Visibility: {visibility}</p>
        </div>
    );
}

export default PitchCard;