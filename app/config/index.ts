export * from '../../config';

// 
export const DOMAIN = 'https://werk.id';
export const INITIAL_BG = '/image/bg/cover.svg';
export const ACCEPT_IMG = '.jpg,.jpeg,.png';
export const MAX_FILE_SIZE = 5e+6; // 5000000 byte / 5 MB

// DEV      = http://localhost:3000
// STAGING  = https://staging.werk.id

/** @Appwrite : */
// For redirect after success
export const REDIRECT_SUCCESS = "/process/signin";
// For redirect after failed
export const REDIRECT_FAILURE = "/auth/failure";

export const BUCKET_ID = '63a117a09c198a16ae4e';

// Functions
export const CheckUserExist = '63a02b6bbf99a9acd42c';
export const CheckAccountAvailability = '63a00f8e46d7b8fed7ca';
export const DeleteAvatarBackground = '63b25b05cb9092f8a3c0';
export const SoftDeleteCandidate = '63bbb8f6a781312a06a2';
export const MasterIndustries = '63b3c9ab70052bf7c328';

// Collection ID
export const CandidateProfiles = '639a94a596500ae9a7d8';
export const CandidateWorkExperience = '63a156f95a5ee2f3b901';

/** @unsplash */
export const UNSPLASH_ACCESS_KEY = '_MMQom9PLjY5mdp4yXYQNJiv9b_MEN8K36C8fuUWoq8';
export const UNSPLASH_SECRET_KEY = 'dUnBDITPRx1YXfXg3lRtdS8rUGZfoAHjWGLUmAnJvjo';
