import { useEffect, useState } from "react";

export const App = () => {
  const [taskToggle, settaskToggle] = useState("");
  const [tasks, setTasks] = useState([{}]);
  const [title, settitle] = useState("");
  const [details, setdetails] = useState("");

  const TaskToggle = (toggle) => {
    settaskToggle(toggle); 
  }

  const GetTaskfunc = async() => {
    const res = await fetch("http://localhost:5000/api/getTasks",{
      method:"GET",
      headers:{"Content-Type":"application/json"}
    });
    if(!res.ok) {
      console.error("failed to lod tasks");
    };
    const data = await res.json();
    setTasks(data);
  }

const UpdateTaskFunc = async (id, status) => {
    const res = await fetch(`http://localhost:5000/api/updateTasks/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            status,
        }),
    });

    if (!res.ok) {
        console.error("Failed to update task");
        return;
    }

    await res.json();
    GetTaskfunc();
};

  const DeleteTaskfunc = async(id) => {
    const res = await fetch(`http://localhost:5000/api/deleteTasks/${id}`,{
      method:"POST",
      headers:{"Content-Type":"application/json"}
    });
    if(!res.ok) {
      console.error("failed to lod tasks");
    };
    const data = await res.json();
    GetTaskfunc();
  }

  const AddTaskfunc = async() => {

    const res = await fetch("http://localhost:5000/api/addTasks",{
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({title, details})
    });
    if(!res.ok){
      console.error("error occored while adding task");
    };
    const rdata = await res.json();
    GetTaskfunc();
  }

  useEffect(() => {
    GetTaskfunc();
  },[]
)

  return (
    <>
{/* Style Animations */}
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-left { animation: slideInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-right { animation: slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-up { animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

{/* Main Body */}
      <main className="flex flex-col items-center min-h-screen w-full bg-linear-to-br from-slate-50 via-amber-50/30 to-blue-50/20 px-4 py-6 font-sans antialiased selection:bg-amber-100">
        
{/* Navigation Bar & Form View */}
        {taskToggle === "" && (
          <>
            <nav className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-slate-100/80 rounded-2xl flex items-center justify-between px-4 py-3.5 shadow-sm shadow-slate-100/50 mb-6">
              <button 
                className="animate-left opacity-0 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-xl px-4 py-2 border border-slate-200/60 shadow-sm transition-all duration-200 active:scale-95 text-sm"
                onClick={() => { TaskToggle("seeTask"); }}
              >
                See task
              </button>

              <h1 className="text-slate-800 font-semibold tracking-tight text-base">
                Task tracker
              </h1>

              <button 
                className="animate-right opacity-0 bg-rose-50/60 hover:bg-rose-50 text-rose-600 font-medium rounded-xl px-4 py-2 border border-rose-100 shadow-sm transition-all duration-200 active:scale-95 text-sm"
                onClick={() => { TaskToggle("deleteTask"); }}
              >
                Delete task
              </button>
            </nav>

{/* Task Form Container */}
            <div className="animate-up opacity-0 w-full max-w-md bg-white border border-slate-100 rounded-3xl p-6 shadow-xl shadow-slate-200/40 flex flex-col gap-4">
              <div>
                <h2 className="text-slate-800 font-bold text-xl tracking-tight">Create Task</h2>
                <p className="text-slate-400 text-xs mt-0.5">Plan out your schedule objectives.</p>
              </div>

              <div className="flex flex-col gap-3.5 mt-2">
                <div className="relative">
                  <input 
                    className="w-full bg-slate-50/60 focus:bg-white text-slate-700 rounded-xl px-4 py-3 border border-slate-200/70 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 placeholder:text-slate-400 outline-none transition-all duration-200 text-sm" 
                    type="text" 
                    placeholder="What's the Title"
                    value={title}
                    onChange={(e) => {settitle(e.target.value)}} 
                  />
                </div>

                <div className="relative">
                  <input 
                    className="w-full bg-slate-50/60 focus:bg-white text-slate-700 rounded-xl px-4 py-3 border border-slate-200/70 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 placeholder:text-slate-400 outline-none transition-all duration-200 text-sm" 
                    type="text" 
                    placeholder="What's the details"
                    value={details} 
                    onChange={(e) => {setdetails(e.target.value)}}
                  />
                </div>
              </div>

              <button className="w-full bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-xl py-3 shadow-md shadow-amber-500/20 transition-all duration-200 active:scale-[0.99] mt-2 text-sm tracking-wide"
              onClick={()=>{AddTaskfunc()}}
              >
                Add Task
              </button>
            </div>
          </>
        )}

{/* See Task Panel */}
        {taskToggle === "seeTask" && (
          <div className="animate-up opacity-0 w-full max-w-md bg-white border border-slate-100 rounded-3xl p-6 shadow-xl shadow-slate-200/40 flex flex-col gap-5">
            <div>
              <h2 className="text-slate-800 font-bold text-xl tracking-tight">Active Tasks</h2>
              <p className="text-slate-400 text-xs mt-0.5">Track your ongoing milestones and project updates.</p>
            </div>

            <div className="flex flex-col gap-3 max-h-87.5 overflow-y-auto pr-1">
              {tasks.map((t) => (
                <div key={t._id} className="flex flex-col gap-2 p-4 bg-slate-50/60 border border-slate-100 rounded-2xl transition-all hover:bg-slate-50">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-slate-800 text-sm leading-tight">{t.title}</h3>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 whitespace-nowrap">
                      {t.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{t.details}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/40">
                    <span className="text-[11px] text-slate-400 font-medium">{t.date || "Today"}</span>
                    <button 
                      className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-100/50 px-3 py-1.5 rounded-xl transition-all duration-200 active:scale-95"
                      onClick={() =>
                          UpdateTaskFunc(
                              t._id,
                              t.status === "Completed" ? "Pending" : "Completed"
                          )
                      }
                  >
                      {t.status === "Completed" ? "Revert" : "Complete"}
                  </button>
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-xl py-3 shadow-md shadow-slate-800/10 transition-all duration-200 active:scale-[0.99] text-sm tracking-wide mt-1"
              onClick={() => { TaskToggle(""); }}
            >
              Close Panel
            </button>
          </div>
        )}

{/* Delete Task Panel */}
        {taskToggle === "deleteTask" && (
          <div className="animate-up opacity-0 w-full max-w-md bg-white border border-slate-100 rounded-3xl p-6 shadow-xl shadow-slate-200/40 flex flex-col gap-5">
            <div>
              <h2 className="text-rose-800 font-bold text-xl tracking-tight">Remove Tasks</h2>
              <p className="text-slate-400 text-xs mt-0.5">Permanently erase elements from your active database.</p>
            </div>

            <div className="flex flex-col gap-3 max-h-87.5 overflow-y-auto pr-1">
              {tasks.map((t) => (
                <div key={t._id} className="flex flex-col gap-2 p-4 bg-rose-50/10 border border-rose-100/30 rounded-2xl transition-all hover:bg-rose-50/30">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-slate-800 text-sm leading-tight">{t.title}</h3>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/50 whitespace-nowrap">
                      {t.status || "Pending"}
                    </span>
                  </div>
                  {t.details}{t.date || "Today"}
                  <button onClick={() => { DeleteTaskfunc(t._id); }}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-100/80 px-3 py-1.5 rounded-xl transition-all duration-200 active:scale-95">
                    Delete
                  </button>
                  </div>
              ))}
        <button className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-xl py-3 shadow-md shadow-slate-800/10 transition-all duration-200 active:scale-[0.99] text-sm tracking-wide mt-1"
        onClick={() => { TaskToggle(""); }}>
          Close Panel
        </button>
        </div>
      </div>
      )}
    </main>
  </>
  );
};