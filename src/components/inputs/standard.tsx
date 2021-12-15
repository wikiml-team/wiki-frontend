import { Field } from "formik";
import { Col } from "fluentui-react-grid";

export function StandardField(props: any) {
  return (
    <Col
      sizeSm={props.sizeSm || 2}
      sizeMd={props.sizeMd || 6}
      sizeLg={props.sizeLg || 3}
    >
      <Field {...props} />
    </Col>
  );
}
