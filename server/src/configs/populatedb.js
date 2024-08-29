#! /usr/bin/env node

import pg from "pg";
const { Client } = pg;

const SQL = `
CREATE TABLE IF NOT EXISTS leaderboard (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 30 ) NOT NULL,
  time INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS targets (
  coords box,
  name varchar(255) PRIMARY KEY,
  EXCLUDE USING gist (coords WITH &&)
);

INSERT INTO targets VALUES ('((2137,1850),(2185,1915))', 'leinster-coat-of-arms'), ('((237,1428),(263,1454))', 'xbox'), ('((1904,324),(2041,390))', 'two-cars');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString:
      "postgresql://top_users_owner:8HMwmsRvC6PN@ep-long-dust-a211r0mi.eu-central-1.aws.neon.tech/odin_waldo?sslmode=require",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
