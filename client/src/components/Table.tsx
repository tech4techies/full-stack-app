/** @format */

import React from "react";
import styled from "@emotion/styled";

const Table = styled.table({
  backgroundColor: "#fff",
});
const Thead = styled.thead({
  fontWeight: 600,
  letterSpacing: 0.5,
});
const Row = styled.tr({});
const Col = styled.td({
  padding: 10,
});
const Tbody = styled.tbody({});

interface ITBodyData {
  [k: string]: any;
}

interface ITableProps {
  headings: string[];
  data: Array<ITBodyData>;
}

export default function SimpleTable(props: ITableProps) {
  const { headings, data } = props;
  let objKeys: string[] = [];
  if (data.length > 0) objKeys = Object.keys(data[0]);
  return (
    <Table>
      <Thead>
        <Row>
          {headings.map((heading: string) => (
            <Col key={heading}>{heading}</Col>
          ))}
        </Row>
      </Thead>
      {data.length > 0 && (
        <Tbody>
          {data.map((d, index) => {
            return (
              <Row key={index}>
                {objKeys.map((objKey, idx) => (
                  <Col key={idx}>{d[objKeys[idx]]}</Col>
                ))}
              </Row>
            );
          })}
        </Tbody>
      )}
    </Table>
  );
}
