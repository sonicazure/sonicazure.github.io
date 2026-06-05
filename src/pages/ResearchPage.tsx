import { useState } from 'react';
import { completedProjects, maturePlans, futurePlans } from '@/data/research';
import type { ResearchProject } from '@/data/research';
import { FlaskConical, Target, Lightbulb } from 'lucide-react';

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="flex items-center gap-3 mt-2">
      <div className="flex-1 h-1 bg-[#30363d] relative">
        <div
          className={`absolute left-0 top-0 h-full ${progress === 0 ? 'bg-[#30363d]' : 'bg-[#c8a45e]'}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="font-mono text-[10px] text-[#484f58]">{progress}%</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { style: string; label: string }> = {
    COMPLETED: { style: 'bg-[#2f7d5f]/10 text-[#2f7d5f] border-[#2f7d5f]/30', label: '已完成' },
    PENDING:   { style: 'bg-[#c8a45e]/10 text-[#c8a45e] border-[#c8a45e]/30', label: '待开展' },
    IDEA:      { style: 'bg-[#e53e3e]/10 text-[#e53e3e] border-[#e53e3e]/30', label: '构思中' },
  };
  const c = config[status] || config.IDEA;
  return <span className={`text-[10px] font-mono px-2 py-0.5 border ${c.style}`}>{c.label}</span>;
}

function ProjectCard({
  proj,
  onToggle,
}: {
  proj: ResearchProject;
  onToggle: (id: string) => void;
}) {
  return (
    <div
      key={proj.id}
      className="card-academic p-5 md:p-6 cursor-pointer"
      onClick={() => onToggle(proj.id)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={proj.status} />
          </div>
          <h3
            className="text-sm md:text-base font-semibold text-[#f0f6fc] mt-2"
            style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
          >
            {proj.title}
          </h3>
          {proj.subtitle && (
            <p className="text-[10px] md:text-xs text-[#8b949e] mt-1 italic">
              {proj.subtitle}
            </p>
          )}
          <ProgressBar progress={proj.progress} />
        </div>
      </div>
    </div>
  );
}

export default function ResearchPage() {
  const [, setExpandedId] = useState<string | null>(null);
  const toggle = (id: string) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="mb-10 md:mb-12">
        <h1
          className="text-2xl md:text-4xl font-bold text-[#f0f6fc] mb-3 md:mb-4"
          style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
        >
          研究实践
        </h1>
        <p className="text-xs md:text-sm text-[#8b949e]">
          从已完成到构想中的研究光谱
        </p>
      </div>

      {/* 已完成的研究项目 */}
      <div className="mb-12 md:mb-16">
        <div className="flex items-center gap-2 mb-6 md:mb-8">
          <FlaskConical size={14} className="text-[#2f7d5f]" />
          <h2 className="section-title text-lg">已完成的研究项目</h2>
        </div>
        <div className="space-y-4">
          {completedProjects.map((proj) => (
            <ProjectCard key={proj.id} proj={proj} onToggle={toggle} />
          ))}
        </div>
      </div>

      {/* 已成型的研究计划 */}
      <div className="mb-12 md:mb-16">
        <div className="flex items-center gap-2 mb-6 md:mb-8">
          <Target size={14} className="text-[#c8a45e]" />
          <h2 className="section-title text-lg">已成型的研究计划</h2>
        </div>
        <div className="space-y-4">
          {maturePlans.map((proj) => (
            <ProjectCard key={proj.id} proj={proj} onToggle={toggle} />
          ))}
        </div>
      </div>

      {/* 画饼 */}
      <div>
        <div className="flex items-center gap-2 mb-6 md:mb-8">
          <Lightbulb size={14} className="text-[#e53e3e]" />
          <h2 className="section-title text-lg">画饼</h2>
        </div>
        <div className="space-y-4">
          {futurePlans.map((proj) => (
            <ProjectCard key={proj.id} proj={proj} onToggle={toggle} />
          ))}
        </div>
      </div>
    </div>
  );
}
