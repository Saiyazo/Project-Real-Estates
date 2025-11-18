import { Container, Row, Col, ProgressBar, Badge } from "react-bootstrap";

const AdsStep = ({ StepAd = 1 }) => {
  const steps = [
    "เลือกแพ็กเกจ",
    "กรอกข้อมูล",
    "ตรวจสอบ",
    "ชำระเงิน",
    "ประกาศเสร็จสิ้น",
  ];

  return (
    <Container className="my-4 mb-5">
      <Row className="justify-content-center text-center">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === StepAd;
          const isCompleted = stepNumber < StepAd;

          return (
            <Col key={index} s={2}>
              <Badge
                pill
                bg={isActive || isCompleted ? "primary" : "secondary"}
                className="mb-2"
              >
                {stepNumber}
              </Badge>
              <div className={isActive ? "fw-bold text-primary" : "text-muted"}>
                {label}
              </div>
            </Col>
          );
        })}
      </Row>

      <ProgressBar
        now={((StepAd - 1) / (steps.length - 1)) * 100}
        className="mt-3"
        style={{ height: "6px" }}
        variant="primary"
      />
    </Container>
  );
};

export default AdsStep;
