"use client";

import React, { useState, use } from "react";
import ProjectHeader from "@/app/projects/ProjectHeader";
import Board from "../BoardView";
import List from "../ListView";
import Timeline from "../TimelineView";
import Table from "../TableView";

type Props = {
  params: Promise<{ id: string }>; // params is now a Promise
};

const Project = ({ params }: Props) => {
    const { id } = use(params); // ✅ Unwrap params using `use()`
    
    const [activeTab, setActiveTab] = useState("Board");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  
    return (
      <div>
        {/* MODAL NEW TASKS */}
        {<ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />}
        {activeTab === "Board" && (
          <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
        {activeTab === "List" && (
          <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
        {activeTab === "Timeline" && (
          <Timeline id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
        {activeTab === "Table" && (
          <Table id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
      </div>
    );
};




export default Project;
