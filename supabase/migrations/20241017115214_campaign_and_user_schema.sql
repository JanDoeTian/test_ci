create type "public"."CampaignStatus" as enum ('active', 'paused', 'inactive');

create table "public"."Campaign" (
    "id" text not null,
    "name" text not null,
    "link" text not null,
    "description" text not null,
    "countries" text[],
    "dailyBudget" integer not null,
    "status" "CampaignStatus" not null default 'active'::"CampaignStatus",
    "userId" text not null,
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone not null
);


create table "public"."User" (
    "id" text not null,
    "email" text not null,
    "onboarded" boolean not null default false
);


CREATE UNIQUE INDEX "Campaign_pkey" ON public."Campaign" USING btree (id);

CREATE UNIQUE INDEX "User_pkey" ON public."User" USING btree (id);

alter table "public"."Campaign" add constraint "Campaign_pkey" PRIMARY KEY using index "Campaign_pkey";

alter table "public"."User" add constraint "User_pkey" PRIMARY KEY using index "User_pkey";

alter table "public"."Campaign" add constraint "Campaign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."Campaign" validate constraint "Campaign_userId_fkey";

grant delete on table "public"."Campaign" to "anon";

grant insert on table "public"."Campaign" to "anon";

grant references on table "public"."Campaign" to "anon";

grant select on table "public"."Campaign" to "anon";

grant trigger on table "public"."Campaign" to "anon";

grant truncate on table "public"."Campaign" to "anon";

grant update on table "public"."Campaign" to "anon";

grant delete on table "public"."Campaign" to "authenticated";

grant insert on table "public"."Campaign" to "authenticated";

grant references on table "public"."Campaign" to "authenticated";

grant select on table "public"."Campaign" to "authenticated";

grant trigger on table "public"."Campaign" to "authenticated";

grant truncate on table "public"."Campaign" to "authenticated";

grant update on table "public"."Campaign" to "authenticated";

grant delete on table "public"."Campaign" to "service_role";

grant insert on table "public"."Campaign" to "service_role";

grant references on table "public"."Campaign" to "service_role";

grant select on table "public"."Campaign" to "service_role";

grant trigger on table "public"."Campaign" to "service_role";

grant truncate on table "public"."Campaign" to "service_role";

grant update on table "public"."Campaign" to "service_role";

grant delete on table "public"."User" to "anon";

grant insert on table "public"."User" to "anon";

grant references on table "public"."User" to "anon";

grant select on table "public"."User" to "anon";

grant trigger on table "public"."User" to "anon";

grant truncate on table "public"."User" to "anon";

grant update on table "public"."User" to "anon";

grant delete on table "public"."User" to "authenticated";

grant insert on table "public"."User" to "authenticated";

grant references on table "public"."User" to "authenticated";

grant select on table "public"."User" to "authenticated";

grant trigger on table "public"."User" to "authenticated";

grant truncate on table "public"."User" to "authenticated";

grant update on table "public"."User" to "authenticated";

grant delete on table "public"."User" to "service_role";

grant insert on table "public"."User" to "service_role";

grant references on table "public"."User" to "service_role";

grant select on table "public"."User" to "service_role";

grant trigger on table "public"."User" to "service_role";

grant truncate on table "public"."User" to "service_role";

grant update on table "public"."User" to "service_role";


