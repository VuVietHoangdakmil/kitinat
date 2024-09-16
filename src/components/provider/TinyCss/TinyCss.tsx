type Props = { children: React.ReactNode };
import "./index.scss";

const TyniCss: React.FC<Props> = ({ children }) => {
  return <div className="tinymce-content">{children}</div>;
};
export default TyniCss;
