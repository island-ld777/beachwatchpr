import { useState } from "react";

export function ReportForm({onClose}) {
    const [email, setEmail] = useState("");
    const [category, setCategory] = useState("pollution");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log([email, category, description]);
}

    return (
        <>
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onClose}>
          X
        </button>
        <form onSubmit={handleSubmit}>
            <label>E-Mail:
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                /> 
            </label>
            <label>Category: 
                <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required>
                    <option value="pollution">Pollution</option>
                    <option value="illegal_construction">Illegal Construction</option>
                    <option value="land_clearing">Land Clearing</option>
                    <option value="blocked_access">Blocked Access</option>
                </select>
            </label>
            <label>Description:
                <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />
            </label>
            <input type="submit"/>
        </form>
      </div>
    </div>
        </>
    );
};


const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    position: "relative",
    width: "80%",
    maxWidth: "500px"
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    fontSize: "18px",
    cursor: "pointer"
  }
};