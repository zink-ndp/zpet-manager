import React, { useEffect, useState } from "react";
import Appointment from "./Appointment";
import Chip from "@mui/joy/Chip";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import { TabPanel } from "@mui/joy";
import axios from "axios";
import { apiUrl } from "@/app/utils/apiUrl";

export default function AppointmentsList() {
  const [index, setIndex] = React.useState(0);
  const [apmList, setApmList] = useState<Array<any>>();

  const fetchAppointmentByStt = async (id: number) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/appointments/status/${id}`
      );
      const data = await response.data.data;
      setApmList(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchAppointmentByStt(index + 1);
  }, [index]);

  return (
    <>
      <Tabs
        className="mt-5"
        aria-label="Soft tabs"
        value={index}
        onChange={(event, value) => setIndex(value as number)}
      >
        <TabList
          sx={{
            pt: 1,
            justifyContent: "center",
            [`&& .${tabClasses.root}`]: {
              flex: "initial",
              bgcolor: "transparent",
              "&:hover": {
                bgcolor: "transparent",
              },
              [`&.${tabClasses.selected}`]: {
                color: "primary.plainColor",
                "&::after": {
                  height: 2,
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                  bgcolor: "primary.500",
                },
              },
            },
          }}
        >
          <Tab
            // disableIndicator
            variant={index === 0 ? "soft" : "plain"}
            color={index === 0 ? "primary" : "neutral"}
          >
            Đợi xác nhận{" "}
            {/* <Chip
              size="sm"
              variant="soft"
              color={index === 0 ? "primary" : "neutral"}
            ></Chip> */}
          </Tab>
          <Tab
            // disableIndicator
            variant={index === 1 ? "soft" : "plain"}
            color={index === 1 ? "primary" : "neutral"}
          >
            Đã xác nhận
          </Tab>
          <Tab
            // disableIndicator
            variant={index === 2 ? "soft" : "plain"}
            color={index === 2 ? "primary" : "neutral"}
          >
            Đã hoàn thành
          </Tab>
          <Tab
            // disableIndicator
            variant={index === 3 ? "soft" : "plain"}
            color={index === 3 ? "primary" : "neutral"}
          >
            Đã huỷ
          </Tab>
        </TabList>

        {/* ĐỢI XÁC NHẬN */}
        <TabPanel value={0}>
          <div className="flex flex-col space-y-5 mt-5 ">
            {(() => {
              const appointment: any = [];
              if (apmList?.length != 0) {
                apmList?.forEach((apm) => {
                  appointment.push(<Appointment info={apm} />);
                });
              } else {
                appointment.push(
                  <div className="w-full h-full flex justify-center items-center mt-7">
                    <p className="text-slate-700 self-center text-2xl">
                      Không có lịch hẹn nào
                    </p>
                  </div>
                );
              }
              return appointment;
            })()}
          </div>
        </TabPanel>

        {/* ĐÃ XÁC NHẬN */}
        <TabPanel value={1}>
          {(() => {
            const appointment: any = [];
            if (apmList?.length != 0) {
              apmList?.forEach((apm) => {
                appointment.push(<Appointment info={apm} />);
              });
            } else {
              appointment.push(
                <div className="w-full h-full flex justify-center items-center mt-7">
                  <p className="text-slate-700 self-center text-2xl">
                    Không có lịch hẹn nào
                  </p>
                </div>
              );
            }
            return appointment;
          })()}
        </TabPanel>

        {/* ĐÃ HOÀN THÀNH */}
        <TabPanel value={2}>
          {(() => {
            const appointment: any = [];
            if (apmList?.length != 0) {
              apmList?.forEach((apm) => {
                appointment.push(<Appointment info={apm} />);
              });
            } else {
              appointment.push(
                <div className="w-full h-full flex justify-center items-center mt-7">
                  <p className="text-slate-700 self-center text-2xl">
                    Không có lịch hẹn nào
                  </p>
                </div>
              );
            }
            return appointment;
          })()}
        </TabPanel>

        {/* ĐÃ HUỶ */}
        <TabPanel value={3}>
          {(() => {
            const appointment: any = [];
            if (apmList?.length != 0) {
              apmList?.forEach((apm) => {
                appointment.push(<Appointment info={apm} />);
              });
            } else {
              appointment.push(
                <div className="w-full h-full flex justify-center items-center mt-7">
                  <p className="text-slate-700 place-self-center text-2xl">
                    Không có lịch hẹn nào
                  </p>
                </div>
              );
            }
            return appointment;
          })()}
        </TabPanel>
      </Tabs>
    </>
  );
}
