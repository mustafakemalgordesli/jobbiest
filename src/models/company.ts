export default interface CompanyModel {
  id: String;
  email: String;
  name: String;
  description: String | null;
  logo: String | null;
  website: String | null;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean
}
