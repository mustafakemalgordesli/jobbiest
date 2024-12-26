export default interface JobModel {
  id: String;
  companyId: String;
  title: String;
  description: String | null;
  subtitle: String | null;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
