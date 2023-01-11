import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ConstructionTwoToneIcon from '@mui/icons-material/ConstructionTwoTone';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
//
import DialogWerk from '~/components/DialogWerk';
import FormSkills from '~/components/profile/FormSkills';

interface HardSkillProps {
  editable?: boolean,
  list: Array<any>,
  onSave?: (data: any) => void
  // onDelete?: (data: any, closeConfirm: any, closeModal: any) => void
}

const OPTIONS_SKILL = [
  // { id: 1, name: "Adobe After Effect" },
  'Adobe After Effect', 'Adobe XD', 'Adobe Illustrator', 'Microsoft Excel', 'Adobe Lightroom',
  'Microsoft Office', 'Adobe Photoshop', 'Microsoft Paint', 'Adobe Premiere', 'Microsoft Power Point',
  'Html', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Python', 'NodeJS', 'Ruby', 'TypeScript', 'SCSS/SASS',
  'Laravel', 'ExpressJS', 'ReactJS', 'VueJS', 'AngularJS', 'Svelte', 'React Native', 'Flutter', 'Kotlin',
];

export default function HardSkill({
  editable,
  list,
  onSave,
}: HardSkillProps){
  const theme = useTheme();
  const isMediaQuery = useMediaQuery(theme.breakpoints.down('md'));
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onOpenModal = () => {
    setOpenModal(true);
  }

  const doDelete = (item: any) => {
    console.info('doDelete item: ', item);
  }

  const saveForm = (data: any) => {
    console.log('saveForm data: ', data);
    setOpenModal(false);
    onSave?.(data);
  }

  return (
    <Card variant="outlined" className="max-md:rounded-none w-card">
      <DialogWerk
        title="Add Hard Skill"
        fullScreen={isMediaQuery}
        fullWidth
        maxWidth="xs"
        scroll="body"
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <FormSkills
          title="hard skill"
          values={{ skill: list }}
          options={OPTIONS_SKILL}
          onSuccessSave={saveForm}
        />
      </DialogWerk>

      <CardHeader
        className="py-3 border-bottom"
        avatar={<ConstructionTwoToneIcon />}
        title="Hard Skill"
        titleTypographyProps={{ className: "text-lg font-medium" }}
        action={editable && !!list?.length && (
          <Button onClick={onOpenModal} color="primary" className="min-w-0 font-bold">
            <EditTwoToneIcon fontSize="small" className={isMediaQuery ? "" : "mr-2"} />
            {!isMediaQuery && 'Edit Hard Skill'}
          </Button>
        )}
      />

      <div className="py-6 px-4">
        {!!list?.length ?
          <Stack direction="row" spacing={1}>
            {list.map((li: any) =>
              <Chip
                key={li.name}
                label={li.name}
                onDelete={() => doDelete(li)}
                variant="outlined"
                className="font-medium"
                deleteIcon={<CloseIcon fontSize="small" />}
              />
            )}
          </Stack>
          :
          editable && (
            <div className="grid place-items-center gap-4 text-gray-400 text-sm">
              <p className="rounded-full bg-gray-100 w-20 h-20 grid place-items-center mx-auto">
                <ConstructionTwoToneIcon sx={{ fontSize: 36 }} color="disabled" />
              </p>
              <p className="mb-4">Tell the company about your hard skill.</p>
              <Button onClick={onOpenModal} variant="outlined" size="large" className="min-w-40p max-md:min-w-full">
                <AddIcon fontSize="small" className="mr-2" />Add Hard Skill
              </Button>
            </div>
          )
        }
      </div>
    </Card>
  );
}
