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

export interface Education extends ReviewFormStatus {
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

export interface Paper extends ReviewFormStatus {
  id: number;
  reviewFormId: number | null;
  publishTime: string;
  category: string;
  role: string;
  isRepresentative: boolean;
  publicationNumber: string;
  name: string;
}

export interface PerformanceAward extends ReviewFormStatus {
  id: number;
  reviewFormId: number | null;
  name: string;
  level: string;
  grantTime: string;
  grantingInstitution: string;
  summery: string;
  materials: Array<string>;
}

export interface PerformancePatent extends ReviewFormStatus {
  id: number;
  reviewFormId: number | null;
  name: string;
  type: string;
  acquireTime: string;
  introduction: string;
  materials: Array<string>;
}

export interface PerformanceResult extends ReviewFormStatus {
  id: number;
  reviewFormId: number | null;
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

export type ReviewStatus = "已审核" | "待审核" | "失败" | "未完成";

export interface ReviewFormSimple {
  id: number;
  userId: number;
  createTime: string;
  reviewYear: string;
  rateSeriesId?: string;
  rateSpecialtyId?: string;
  reviewMeetingId: number;
  status: ReviewStatus;
  level: string;
  declarationSeries: string;
}

export interface TalentIntroductionMaterial extends ReviewFormStatus {
  id: number;
  reviewFormId: number | null;
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

/**
 * 表单评审状态
 */
export interface ReviewFormStatus {
  status?: string;
}

export interface UserSimpleInformation extends FormState {
  id: number;
  name: string;
  sex: string;
  nation: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  account: string | null;
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

export interface WorkExperience extends ReviewFormStatus {
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

export interface ReviewMeeting {
  id: number | undefined;
  name: string;
  level: string;
  series: string;
}

export interface IRequestStructure<T> {
  code: number;
  message: string;
  data: T;
  datetime: string;
}
