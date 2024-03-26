import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PetsIcon from "@mui/icons-material/Pets";
import Face3Icon from "@mui/icons-material/Face3";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PercentIcon from "@mui/icons-material/Percent";

export const sidebarItemsManager = [
  { key: "dashboard", text: "Tổng quan", icon: <DashboardIcon /> },
  { key: "appointments", text: "Lịch hẹn", icon: <NotificationsActiveIcon /> },
  { key: "makeinvoice", text: "Lập hoá đơn", icon: <PostAddIcon /> },
  { key: "invoices", text: "Hoá đơn", icon: <ReceiptIcon /> },
  { key: "pets", text: "Thú cưng", icon: <PetsIcon /> },
  { key: "custommers", text: "Khách hàng", icon: <Face3Icon /> },
  { key: "conservation", text: "Chat", icon: <QuestionAnswerIcon /> },
  { key: "staffs", text: "Nhân viên", icon: <SupervisedUserCircleIcon /> },
  { key: "services", text: "Dịch vụ", icon: <MedicalInformationIcon /> },
  { key: "vouchers", text: "Khuyến mãi", icon: <PercentIcon /> },
];

export const sidebarItemsStaff = [
  { key: "dashboard", text: "Tổng quan", icon: <DashboardIcon /> },
  { key: "appointments", text: "Lịch hẹn", icon: <NotificationsActiveIcon /> },
  { key: "makeinvoice", text: "Lập hoá đơn", icon: <PostAddIcon /> },
  { key: "invoices", text: "Hoá đơn", icon: <ReceiptIcon /> },
  { key: "pets", text: "Thú cưng", icon: <PetsIcon /> },
  { key: "custommers", text: "Khách hàng", icon: <Face3Icon /> },
  { key: "conservation", text: "Chat", icon: <QuestionAnswerIcon /> },
];
