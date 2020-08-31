/** @format */

import React from "react";
import styled from "@emotion/styled";

export const Table = styled.table({
  backgroundColor: "#fff",
});
export const Thead = styled.thead({
  fontWeight: 600,
  letterSpacing: 0.5,
});
export const Row = styled.tr({});
export const Col = styled.td({
  padding: 10,
  paddingBottom: 0,
  paddingLeft: 0,
});
export const Tbody = styled.tbody({});

interface ITBodyData {
  [k: string]: any;
}

interface ITableProps {
  headings: string[];
  data: Array<ITBodyData>;
}

export function SimpleTable(props: ITableProps) {
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
                {objKeys.map((x, idx) => (
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
