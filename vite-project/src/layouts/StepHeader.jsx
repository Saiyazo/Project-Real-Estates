import { Container, Row, Col, ProgressBar, Badge } from "react-bootstrap";

const StepHeader = ({ activeStep = 1 }) => {
  const steps = [
    "นำเสนออสังหาของคุณ",
    "เพิ่มรูปภาพ",
    "เพิ่มรายละเอียด",
    "ประกาศ",
  ];

  return (
    <Container className="my-4 mb-5">
      <Row className="justify-content-center text-center">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === activeStep;
          const isCompleted = stepNumber < activeStep;

          return (
            <Col key={index} xs={3}>
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
        now={((activeStep - 1) / (steps.length - 1)) * 100}
        className="mt-3"
        style={{ height: "6px" }}
        variant="primary"
      />
    </Container>
  );
};

export default StepHeader;
