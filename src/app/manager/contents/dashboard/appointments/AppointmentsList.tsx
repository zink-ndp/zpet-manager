import React from 'react'
import Appointment from './Appointment'
import Chip from '@mui/joy/Chip';
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from '@mui/joy/Tab';
import { TabPanel } from "@mui/joy";

export default function AppointmentsList() {

  const [index, setIndex] = React.useState(0);
  return <>
      <Tabs
          className="mt-5"
          aria-label="Soft tabs"
          value={index}
          onChange={(event, value) => setIndex(value as number)}
        >
          <TabList 
            sx={{
              pt: 1,
              justifyContent: 'center',
              [`&& .${tabClasses.root}`]: {
                flex: 'initial',
                bgcolor: 'transparent',
                '&:hover': {
                  bgcolor: 'transparent',
                },
                [`&.${tabClasses.selected}`]: {
                  color: 'primary.plainColor',
                  '&::after': {
                    height: 2,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    bgcolor: 'primary.500',
                  },
                },
              },
            }}>
            <Tab
              // disableIndicator
              sx={{borderRadius:'50px'}}
              variant={index === 0 ? "soft" : "plain"}
              color={index === 0 ? "primary" : "neutral"}
            >
              Đợi xác nhận{' '}
              <Chip
                size="sm"
                variant="soft"
                color={index === 0 ? 'primary' : 'neutral'}
              >
                14
              </Chip>
            </Tab>
            <Tab
              // disableIndicator
              sx={{borderRadius:'50px'}}
              variant={index === 1 ? "soft" : "plain"}
              color={index === 1 ? "primary" : "neutral"}
            >
              Đã xác nhận
            </Tab>
            <Tab
              // disableIndicator
              sx={{borderRadius:'50px'}}
              variant={index === 2 ? "soft" : "plain"}
              color={index === 2 ? "primary" : "neutral"}
            >
              Đã hoàn thành
            </Tab> 
          </TabList>
          <TabPanel value={0}>
            <div className="flex flex-col space-y-5 mt-5 ">
              <Appointment name="En Thuw" service='Tỉa lông' />
              <Appointment name="Zin Zin" service='Tắm' />
            </div>
          </TabPanel>
          <TabPanel value={1}>
            <div className="flex flex-col space-y-5 mt-5 ">
              <Appointment name="Fukk" service='1' />
            </div>
          </TabPanel>
          <TabPanel value={2}>
            <div className="flex flex-col space-y-5 mt-5 ">
              <Appointment name="Dy Yi" service='2' />
            </div>
          </TabPanel>
        </Tabs>
  </>
}
