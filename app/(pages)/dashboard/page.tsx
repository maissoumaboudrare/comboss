"use client";
import { Section } from "@/app/atoms/_components/commons/Section";
import AccountManagerForm from "./_components/AccountManagerForm";
import RouteGuard from "./_components/RouteGuard";

const Dashboard = () => {
  return (
    <RouteGuard>
      <Section className="flex h-screen justify-center items-center">
        <AccountManagerForm />
      </Section>
    </RouteGuard>
  );
};

export default Dashboard;
