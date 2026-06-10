import "../styles/CategoryCard.css";

interface CategoryCardProps {
  image?: string | null;
  title: string;
  description?: string;
}

const CategoryCard = ({ image, title, description }: CategoryCardProps) => {
  return (
    <div className="category-card">
      {image && (
        <img className="category-card__image" src={image} alt={title} />
      )}
      <div className="category-card__body">
        <h3 className="category-card__title">{title}</h3>
        {description && (
          <p className="category-card__description">{description}</p>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;