import { useState, useEffect } from "react";
import type { ReactElement } from 'react';
// import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import FormSelect from 'react-bootstrap/FormSelect';
import Placeholder from 'react-bootstrap/Placeholder';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ConstructionTwoToneIcon from '@mui/icons-material/ConstructionTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import LightbulbTwoToneIcon from '@mui/icons-material/LightbulbTwoTone';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import HelpTwoToneIcon from '@mui/icons-material/HelpTwoTone';
import ExploreTwoToneIcon from '@mui/icons-material/ExploreTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';
import * as yup from "yup";
import { FormattedDate } from 'react-intl';

import LayoutLogged from '../../components/layouts/LayoutLogged';
import Cover from '../../modules/profile/Cover';
import SetAvatar from '../../modules/profile/SetAvatar';
import FormProfile from '../../modules/profile/FormProfile';
import FormWorkExperience from '../../modules/profile/FormWorkExperience';
import FormEducation from '../../modules/profile/FormEducation';
import FormSkills from '../../modules/profile/FormSkills';
import LineClamp from '../../components/LineClamp';

const STATES = ['East Java', 'DKI Jakarta'];
const CITIES = ['Jakarta', 'Malang'];

const Profile = () => {
  const COVER_PLACEHOLDER = "/image/bg/cover.jpg";
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>({});
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [modalEditData, setModalEditData] = useState<any>({});

  useEffect(() => {
    // Dummy Xhr
    setTimeout(() => {
      setUserData({
        profile: {
          created_at: "2022-12-03T14:48:14.098Z",
          fullname: "John Doe",
          nickname: "john_doe",
          headline: "UI/UX Designer",
          bio: "I'm a software engineer based in Barcelona with 10 years of experience in the software industry. My focus area for the past few years has been front-end development with React, but I'm also skilled in back-end development with Go. I am very quality-conscious because I spent my early career years in QA roles.",
          country: "Indonesia",
          states: "East Java",
          city: "Malang",
          cover: COVER_PLACEHOLDER,
        },
      });
  
      setLoadingData(true);
    }, 1e3);
  }, []);

  const onShowModalEdit = (data: any) => {
    setModalEditData(data);
    setModalEdit(true);
  }

  const onCloseModalEdit = () => {
    setModalEdit(false);
  }

  const onSave = (data: any, key: string) => {
    let fixData;
    if(Array.isArray(data)){
      fixData = data.map(item => {
        const { _TYPE, _TITLE, ...restData } = item;
        return restData;
      });
    }else{
      const { _TYPE, _TITLE, ...restData } = data;
      fixData = restData;
    }
    // console.log('onSave data: ', data);
    setUserData({
      ...userData,
      [key]: fixData, // data
    });
    setModalEdit(false);
  }

  const renderForm = () => {
    switch(modalEditData._TYPE){
      case "profile":
        return (
          <FormProfile
            values={modalEditData}
            validation={{
              states: yup.string().trim().required('Required choice for Province/States.'),
              city: yup.string().trim().required('Required choice for City.'),
            }}
            onSubmit={(val: any) => onSave(val, 'profile')}
          >
            {({ register, isSubmitting, errors }: any) => 
              <>
                <FormSelect
                  {...register("states")}
                  required
                  disabled={isSubmitting}
                  isInvalid={!!errors.states}
                  id="states"
                  className="form-select-solid mt-3"
                >
                  <option value="">Select Province/States</option>
                  {STATES.map((item: any) => 
                    <option key={item} value={item}>{item}</option>
                  )}
                </FormSelect>
                {errors.states && <div className="invalid-feedback">{errors.states.message}</div>}

                <FormSelect
                  {...register("city")}
                  required
                  disabled={isSubmitting}
                  isInvalid={!!errors.city}
                  id="city"
                  className="form-select-solid mt-3"
                >
                  <option value="">Select City</option>
                  {CITIES.map((item: any) => 
                    <option key={item} value={item}>{item}</option>
                  )}
                </FormSelect>
                {errors.city && <div className="invalid-feedback">{errors.city.message}</div>}
              </>
            }
          </FormProfile>
        );
      
      case "workExperience":
        return (
          <FormWorkExperience
            values={modalEditData.values || {}}
            onSubmit={(val: any) => {
              const datas = userData.workExperience || []
              onSave(modalEditData.values ? datas.map((item: any, index: number) => (index === val.idx ? val : item) ) : [ ...datas, val ], 'workExperience')
            }}
          />
        );

      case "education":
        return (
          <FormEducation
            values={modalEditData.values || {}}
            onSubmit={(val: any) => {
              const datas = userData.education || []
              onSave(modalEditData.values ? datas.map((item: any, index: number) => (index === val.idx ? val : item) ) : [ ...datas, val ], 'education')
            }}
            onDelete={() => {
              onSave(userData.education.filter((f: any, idx: number) => idx !== modalEditData.values.idx), 'education');
            }}
          />
        );
      
      case "hardSkill":
        return (
          <FormSkills
            skillType="hard"
            values={modalEditData || []}
            onSubmit={(val: any) => onSave([ ...(userData.hardSkill || []), ...val ], 'hardSkill')}
            onNextStep={() => setModalEditData({ ...modalEditData, _TITLE: "Select Years of Experience" })}
            onBackStep={() => setModalEditData({ ...modalEditData, _TITLE: "Edit Hard Skill" })}
          />
        );
      
      case "softSkill":
        return (
          <FormSkills
            skillType="soft"
            values={modalEditData || []}
            onSubmit={(val: any) => onSave([ ...(userData.softSkill || []), ...val ], 'softSkill')}
            onNextStep={() => setModalEditData({ ...modalEditData, _TITLE: "Select Years of Experience" })}
            onBackStep={() => setModalEditData({ ...modalEditData, _TITLE: "Edit Soft Skill" })}
          />
        );

      default:
        return null;
    }
  }

  return (
    <>
      <Modal
        show={modalEdit}
        onHide={onCloseModalEdit}
      >
        <Modal.Header className="py-4 bg-white position-sticky top-0 z-10 shadow-sm" closeButton>
          <Modal.Title>
            {/* {modalEditData.type === "cover" ? 'Edit Background Photo' : 'Edit Photo Profile'} */}
            {modalEditData._TITLE}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderForm()}
        </Modal.Body>
      </Modal>

      <Container className="py-lg-9 px-phone-ls-0">
        <Row>
          <Col lg className="d-grid gap-4 gap-lg-7 px-phone-ls-0 mb-4">
            <Card className="rounded-phone-0">
              <Cover
                disabled={!loadingData}
                src={userData?.profile?.cover}
              />

              <Card.Body className="text-black-50 z-20">
                <Row>
                  <Col>
                    <SetAvatar
                      loading={!loadingData}
                    />

                    {loadingData ?
                      <>
                        <h1>{userData?.profile?.fullname}</h1>
                        <h5 className="text-warning">{userData?.profile?.headline}</h5>
                        <address>
                          <LocationOnTwoToneIcon fontSize="small" className="me-1" />
                          {userData?.profile?.city}, {userData?.profile?.states}, {userData?.profile?.country}
                        </address>
                      </>
                      :
                      <>
                        <Placeholder as="h1" animation="glow">
                          <Placeholder xs={3} />
                        </Placeholder>
                        <Placeholder as="h5" animation="glow">
                          <Placeholder xs={4} />
                        </Placeholder>
                        <Placeholder as="address" animation="glow">
                          <Placeholder xs={5} />
                        </Placeholder>
                      </>
                    }
                  </Col>
                  
                  <Col lg={3} className="text-center text-lg-end mb-4">
                    {loadingData ?
                      <Button variant="light" size="sm" className="py-1 px-2 fs-5">
                        <img alt="Werk" src="/image/logo/werk-logo-symbol-line.svg" className="me-1" />
                        werk.id/@{userData?.profile?.nickname}
                      </Button>
                      :
                      <Placeholder.Button animation="glow" variant="secondary" xs={9} className="p-4" />
                    }

                    <Button
                      variant="link"
                      className="p-3 mt-lg-7 text-primary"
                      disabled={!loadingData}
                      onClick={() => onShowModalEdit({ _TYPE: "profile", _TITLE: "Edit Profile", ...userData.profile })}
                    >
                      <EditTwoToneIcon /> Edit Profile
                    </Button> 
                  </Col>
                </Row>

                {loadingData ?
                  <>
                    <p className="fs-5 whitespace-pre-wrap text-break">{userData?.profile?.bio}</p>
                    {userData?.profile?.created_at &&
                      <div className="small mt-6">
                        Joined Werk: <time className="fw-bold" dateTime={userData?.profile.created_at}>
                          {/* {new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(new Date(userData?.profile.created_at))} */}
                          <FormattedDate
                            value={new Date(userData?.profile.created_at)}
                            day="2-digit"
                            month="long"
                            year="numeric"
                          />
                        </time>
                      </div>
                    }
                  </>
                  :
                  <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={9} className="my-3" />
                    <Placeholder xs={8} className="mb-5 d-block" />
                    <Placeholder xs={4} />
                  </Placeholder>
                }
              </Card.Body>
            </Card>

            <Card className="rounded-phone-0">
              <Card.Header className="min-h-auto py-3 px-7">
                <Card.Title>
                  <WorkTwoToneIcon className="me-2" />Work Experience
                </Card.Title>
                {userData.workExperience && 
                  <Button
                    variant="link"
                    className="text-primary py-1 align-self-center"
                    onClick={() => onShowModalEdit({ _TYPE: "workExperience", _TITLE: "Add Work Experience" })}  
                  >
                    <AddCircleTwoToneIcon className="me-2" />Add Work Experience
                  </Button>
                }
              </Card.Header>
              <Card.Body className="px-7">
                {userData.workExperience ?
                  <div className="d-grid gap-6">
                    {userData.workExperience.map((item: any, idx: number) => 
                      <div key={idx} className="d-flex">
                        <div className="flex-shrink-0">
                          <div
                            className="rounded-circle d-grid place-items-center position-relative w-60px h-60px"
                            style={{ backgroundColor: '#cfd9ff' }}
                          >
                            <BusinessTwoToneIcon fontSize="large" color="primary" />
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-4">
                          <h5>
                            {item.job_position}
                            <Button
                              size="lg"
                              variant="light"
                              className="bg-transparent border-0 p-1 float-end mt-n1"
                              onClick={() => onShowModalEdit({ _TYPE: "workExperience", _TITLE: "Edit Work Experience", values: { ...item, idx } })}
                            >
                              <EditTwoToneIcon color="primary" sx={{ fontSize: 24 }} />
                            </Button>  
                          </h5>
                          <div>{item.company_name}</div>
                          <div>{item.commitment_type} | {item.work_type}</div>
                          <div>{item.join_date} - {item.isCurrentWork ? 'Now' : item.end_date} | 9 Months</div>
                          <address>Malang, East Java, {item.company_location}</address>
                          {!!item.description.length &&
                            <LineClamp
                              line={3}
                              className="mt-3"
                              id={'we' + idx}
                              label="Read more"
                              labelShow="Read less"
                              labelProps={{
                                variant: "link",
                                className: "text-primary text-decoration-underline p-0 mt-3"
                              }}
                            >
                              {item.description}
                            </LineClamp>
                          }
                        </div>
                      </div>
                    )}

                    {userData.workExperience.length > 3 && <Button variant="light" className="col-4 mx-auto">View All {userData.workExperience.length} Work Experiences</Button>}
                  </div>
                  :
                  <div className="text-center text-black-50">
                    <p className="rounded-circle bg-light w-80px h-80px d-grid place-items-center mx-auto">
                      <WorkTwoToneIcon sx={{ fontSize: 36 }} color="disabled" />
                    </p>
                    <p>Tell the company about your work experience.</p>
                    <Button
                      variant="outline-primary"
                      className="btn-outline btn-active-light-primary col-12 col-lg-4"
                      onClick={() => onShowModalEdit({ _TYPE: "workExperience", _TITLE: "Add Work Experience" })}
                    >
                      <AddTwoToneIcon /> Add Work Experience
                    </Button>
                  </div>
                }
              </Card.Body>
            </Card>

            <Card className="rounded-phone-0">
              <Card.Header className="min-h-auto py-3 px-7">
                <Card.Title>
                  <SchoolTwoToneIcon className="me-3" />Education
                </Card.Title>
                {userData.education && 
                  <Button
                    variant="link"
                    className="text-primary py-1 align-self-center"
                    onClick={() => onShowModalEdit({ _TYPE: "education", _TITLE: "Add Education" })}  
                  >
                    <SchoolTwoToneIcon className="me-2" />Add Education
                  </Button>
                }
              </Card.Header>
              <Card.Body className="px-7">
                {userData.education ?
                  <div className="d-grid gap-6">
                    {userData.education.map((item: any, idx: number) => 
                      <div key={item.id || idx}>
                        <h5>
                          {item.education_title}
                          <Button
                            size="lg"
                            variant="light"
                            className="bg-transparent border-0 p-1 float-end mt-n1"
                            onClick={() => onShowModalEdit({ _TYPE: "education", _TITLE: "Edit Education", values: { ...item, idx } })}
                          >
                            <EditTwoToneIcon color="primary" sx={{ fontSize: 24 }} />
                          </Button> 
                        </h5>
                        <div>{item.join_date} | {item.end_date}</div>
                        <div>{item.education_name}</div>
                      </div>
                    )}

                    {userData.education.length > 3 && <Button variant="light" className="col-4 mx-auto">View All {userData.education.length} Educations</Button>}
                  </div>
                  :
                  <div className="text-center text-black-50">
                    <p className="rounded-circle bg-light w-80px h-80px d-grid place-items-center mx-auto">
                      <SchoolTwoToneIcon sx={{ fontSize: 36 }} color="disabled" />
                    </p>
                    <p>Tell the company about your education.</p>
                    <Button
                      variant="outline-primary"
                      className="btn-outline btn-active-light-primary col-12 col-lg-4"
                      onClick={() => onShowModalEdit({ _TYPE: "education", _TITLE: "Add Education" })}
                    >
                      <AddTwoToneIcon /> Add Education
                    </Button>
                  </div>
                }
              </Card.Body>
            </Card>

            <Card className="rounded-phone-0">
              <Card.Header className="min-h-auto py-3 px-7">
                <Card.Title>
                  <ConstructionTwoToneIcon className="me-3" />Hard Skills
                </Card.Title>
                {userData.hardSkill && 
                  <Button
                    variant="link"
                    className="text-primary py-1 align-self-center"
                    onClick={() => onShowModalEdit({ _TYPE: "hardSkill", _TITLE: "Add Hard Skill" })}  
                  >
                    <EditTwoToneIcon className="me-2" />Edit Hard Skill
                  </Button>
                }
              </Card.Header>
              <Card.Body>
                {userData.hardSkill ?
                  <div className="d-grid gap-6">
                    {userData.hardSkill.map((item: any, idx: number) => 
                      <div key={item.id || idx}>
                        <h5>{item.name}</h5>
                        {item.duration && <div>{item.duration} years experience</div>}
                      </div>
                    )}

                    {userData.hardSkill.length > 3 && <Button variant="light" className="col-4 mx-auto">View All {userData.hardSkill.length} Hard Skill</Button>}
                  </div>
                  :
                  <div className="text-center text-black-50">
                    <p className="rounded-circle bg-light w-80px h-80px d-grid place-items-center mx-auto">
                      <ConstructionTwoToneIcon sx={{ fontSize: 36 }} color="disabled" />
                    </p>
                    <p>Tell the company about your hard skill.</p>
                    <Button
                      variant="outline-primary"
                      className="btn-outline btn-active-light-primary col-12 col-lg-4"
                      onClick={() => onShowModalEdit({ _TYPE: "hardSkill", _TITLE: "Add Hard Skill" })}
                    >
                      <AddTwoToneIcon /> Add Hard Skill
                    </Button>
                  </div>
                }
              </Card.Body>
            </Card>

            <Card className="rounded-phone-0">
              <Card.Header className="min-h-auto py-3 px-7">
                <Card.Title>
                  <LightbulbTwoToneIcon className="me-3" />Soft Skills
                </Card.Title>
                {userData.softSkill && 
                  <Button
                    variant="link"
                    className="text-primary py-1 align-self-center"
                    onClick={() => onShowModalEdit({ _TYPE: "softSkill", _TITLE: "Add Soft Skill" })}  
                  >
                    <EditTwoToneIcon className="me-2" />Edit Soft Skill
                  </Button>
                }
              </Card.Header>
              <Card.Body>
                {userData.softSkill ?
                  <div className="d-grid gap-6">
                    {userData.softSkill.map((item: any, idx: number) => 
                      <div key={item.id || idx}>
                        <h5>{item.name}</h5>
                        {item.duration && <div>{item.duration} years experience</div>}
                      </div>
                    )}

                    {userData.softSkill.length > 3 && <Button variant="light" className="col-4 mx-auto">View All {userData.softSkill.length} Soft Skill</Button>}
                  </div>
                  :
                  <div className="text-center text-black-50">
                    <p className="rounded-circle bg-light w-80px h-80px d-grid place-items-center mx-auto">
                      <LightbulbTwoToneIcon sx={{ fontSize: 36 }} color="disabled" />
                    </p>
                    <p>Tell the company about your soft skill.</p>
                    <Button
                      variant="outline-primary"
                      className="btn-outline btn-active-light-primary col-12 col-lg-4"
                      onClick={() => onShowModalEdit({ _TYPE: "softSkill", _TITLE: "Add Soft Skill" })}
                    >
                      <AddTwoToneIcon /> Add Soft Skills
                    </Button>
                  </div>
                }
              </Card.Body>
            </Card>
          </Col>

          <Col xs lg="3" className="px-phone-ls-0 mb-4">
            <Card className="mb-4 rounded-phone-0">
              <Card.Header className="min-h-auto py-2 px-6">
                <Card.Title>
                  <WorkTwoToneIcon className="me-2" />Work Availability
                </Card.Title>
                <div className="form-check form-switch form-check-custom form-check-solid">
                  <input className="form-check-input h-20px w-30px cursor-pointer" type="checkbox" value="" />
                </div>
              </Card.Header>
              <Card.Body className="py-2 px-6">
                {['Internship', 'Volunteer', 'Part Time', 'Full Time', 'Contract', 'Freelance Hourly Based', 'Freelance Task Based', 'Frelance Project Based'].map((item) => 
                  <div key={item} className="form-check form-check-custom flex-row-reverse py-2">
                    <input className="form-check-input h-20px w-20px" type="checkbox" value="" id={item} />
                    <label className="form-check-label ms-0 me-auto" htmlFor={item}>
                      {item}
                    </label>
                  </div>
                )}
              </Card.Body>
              <Card.Footer className="py-2 px-5 text-end">
                <a href="/" className="text-black-50">
                  <HelpTwoToneIcon fontSize="small" className="me-1" />Learn more
                </a>
              </Card.Footer>
            </Card>

            <Card className="rounded-phone-0">
              <Card.Header className="min-h-auto py-2 px-6">
                <Card.Title>
                  <ExploreTwoToneIcon className="me-2" />Preferred Work Type
                </Card.Title>
              </Card.Header>
              <Card.Body className="py-2 px-6">
                {['Onsite Work', 'Remote Work', 'Hybrid'].map((item) => 
                  <div key={item} className="form-check form-check-custom flex-row-reverse py-2">
                    <input className="form-check-input h-20px w-20px" type="checkbox" value="" id={item} />
                    <label className="form-check-label ms-0 me-auto" htmlFor={item}>
                      {item}
                    </label>
                  </div>
                )}
              </Card.Body>
              <Card.Footer className="py-2 px-5 text-end">
                <a href="/" className="text-black-50">
                  <HelpTwoToneIcon fontSize="small" className="me-1" />Learn more
                </a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

Profile.getLayout = function getLayout(page: ReactElement){
  return (
    <LayoutLogged title="Profile">
      {page}
    </LayoutLogged>
  );
}

export default Profile;
