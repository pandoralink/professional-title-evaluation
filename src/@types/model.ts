export interface User {
  account: string;
  password: string;
}

export interface CommonResult {
  code: number;
  message: string;
  data: unknown;
  datetime: string;
}

export interface Department {
  id: number;
  name: string;
  level: string;
  account: string;
  password: string;
}

export interface Education {
  id: number;
  userId: number;
  graduationTime: string;
  school: string;
  specialty: string;
  academicStructure: string;
  educationNumber: string;
  degree: string;
  materials: Array<string>;
}

export interface Paper {
  id: number;
  reviewFormId: number;
  publishTime: string;
  category: string;
  role: string;
  isRepresentative: boolean;
  publicationNumber: string;
  name: string;
}

export interface PerformanceAward {
  id: number;
  reviewFormId: number;
  name: string;
  level: string;
  grantTime: string;
  grantingInstitution: string;
  summery: string;
  materials: Array<string>;
}

export interface PerformancePatent {
  id: number;
  reviewFormId: number;
  name: string;
  type: string;
  acquireTime: string;
  introduction: string;
  materials: Array<string>;
}

export interface PerformanceResult {
  id: number;
  reviewFormId: number;
  name: string;
  size: string;
  role: string;
  completion: string;
  benefit: string;
  patent: string;
  projectMaterials: Array<string>;
  tenureMaterials: Array<string>;
  resultMaterials: Array<string>;
}

export interface ReviewFormDetailed {
  workExperience: WorkExperience[];
  paper?: Paper[];
  education: Education;
  performanceAward?: PerformanceAward[];
  performancePatent?: PerformancePatent[];
  performanceResult?: PerformanceResult[];
  talentIntroductionMaterial?: TalentIntroductionMaterial[];
  userDetailInformation: UserDetailInformation;
  reviewFormSimple: ReviewFormSimple;
}

export interface ReviewFormSimple {
  id: number;
  userId: number;
  createTime: string;
  reviewYear: string;
  rateSeriesId: string;
  rateSpecialtyId: string;
  reviewMeetingId: number;
  status: string;
}

export interface ReviewMeeting {
  id: number;
  departmentId: number;
  name: string;
}

export interface TalentIntroductionMaterial {
  id: number;
  reviewFormId: number;
  name: string;
  materials: string[];
}

export interface FormState {
  /**
   * true：展示
   * false：编辑
   */
  state?: boolean;
}

export interface UserSimpleInformation extends FormState {
  id: number;
  name: string;
  sex: string;
  nation: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  account: string;
}

export interface UserDetailInformation extends UserSimpleInformation {
  idCardNumber: string;
  department: string;
  politicalAppearance: string;
  personalStatus: string;
  idCardFrontPhoto: string;
  idCardReversePhoto: string;
  origin: string;
  address: string;
  twoInchPhoto: string;
  executive: string;
}

export interface WorkExperience {
  id: number;
  userId: number;
  separationTime: string;
  workAddress: string;
  career: string;
  attestor: string;
  participationTime: string;
  materials: string[];
}

/**
 * formRef: 实际属性为 FormInstance
 */
export interface ReviewFormData<T> {
  formRef: any;
  value: T;
  originalValue: T;
  edit: boolean;
}
