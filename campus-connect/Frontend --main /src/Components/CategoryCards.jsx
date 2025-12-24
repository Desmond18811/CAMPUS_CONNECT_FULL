import Card from "./Card";
import "../styles/Category.css";
import questionImg from "../assets/Past_questions.png";
import fileImg from "../assets/Notesandmaterials.png";
import documentImg from "../assets/Projects.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function CategoryCards() {
  return (
    <div className="component">
      <div className="cards">
        <Card
          title="Past Questions"
          description="Access and practice past exam questions to prepare better for exams."
          image={questionImg}
          buttonText="View Past Questions"
          buttonIcon={<FontAwesomeIcon icon={faArrowRight} />}
        />

        <Card
          title="Projects"
          description="Explore past projects showcasing practical applications and creative solutions."
          image={documentImg}
          buttonText="View Projects"
          buttonIcon={<FontAwesomeIcon icon={faArrowRight} />}
        />

        <Card
          title="Notes & Material"
          description="Access useful study notes and learning materials all in one place."
          image={fileImg}
          buttonText="View Notes & Material"
          buttonIcon={<FontAwesomeIcon icon={faArrowRight} />}
        />
      </div>
    </div>
  );
}

export default CategoryCards;