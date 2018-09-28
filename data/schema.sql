create database if not exists home_made_bet;

create table if not exists matches
(
  id              serial not null
    constraint pk_question_id
    primary key,
  date date,
  home_team_title text,
  home_team_goals integer,
  away_team_title text,
  away_team_goals integer
);

create table if not exists bet
(
  bet_id integer not null
    constraint pk_bet_id
      primary key,
  user_id integer,
  match_id integer,
  home_goals integer,
  away_goals integer,
  home_win text,
  away_win text
)


create table if not exists user_s
(
  id serial not null
		constraint pk_user_id
			primary key
		constraint uc_users_id
			unique
		constraint users_id_key
			unique,
	username varchar(255)
		constraint uc_users_username
			unique,
	user_bet_id integer
		constraint uc_user_bet_id
			unique,
	password text,
	constraint uc_users
		unique (id, username, user_bet_id)
);