drop table if exists "grades";

create table "grades" (
  "gradeId"   serial,
  "name"      text    not null,
  "course"    text    not null,
  "grade"     integer not null,
  "createdAt" timestamptz(6) not null default now()
);

drop table if exists "users";


CREATE TABLE "user" (
	"userId" serial NOT NULL,
	"userName" varchar(255) NOT NULL UNIQUE,
	"email" varchar(255) NOT NULL,
	"userPassword" varchar(255) NOT NULL,
	"createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "user_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);