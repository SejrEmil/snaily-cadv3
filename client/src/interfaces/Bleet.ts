import User from "./User";

interface Bleet {
  id: string;
  title: string;
  body: string;
  markdown: string;
  file_dir: string;
  likes: string;
  user_id: User["id"];
  uploaded_at: number;
}

export default Bleet;
