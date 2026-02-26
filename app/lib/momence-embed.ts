const MOMENCE_SCRIPT_SRC =
  "https://momence.com/plugin/host-schedule/host-schedule.js";

type MomenceScheduleScriptConfig = {
  hostId: string;
  teacherIds: string;
  locationIds: string;
  tagIds: string;
  defaultFilter: string;
  locale: string;
  liteMode?: string;
};

type MountMomenceScheduleScriptArgs = {
  mountPoint: HTMLDivElement;
  config: MomenceScheduleScriptConfig;
  onLoad: () => void;
  onError: () => void;
  cacheBust?: boolean;
};

export function mountMomenceScheduleScript({
  mountPoint,
  config,
  onLoad,
  onError,
  cacheBust = false,
}: MountMomenceScheduleScriptArgs) {
  const script = document.createElement("script");
  script.async = true;
  script.type = "module";
  script.setAttribute("fetchpriority", "low");
  script.setAttribute("host_id", config.hostId);
  script.setAttribute("teacher_ids", config.teacherIds);
  script.setAttribute("location_ids", config.locationIds);
  script.setAttribute("tag_ids", config.tagIds);
  script.setAttribute("default_filter", config.defaultFilter);
  script.setAttribute("locale", config.locale);

  if (config.liteMode) {
    script.setAttribute("lite_mode", config.liteMode);
  }

  script.onload = onLoad;
  script.onerror = onError;
  if (cacheBust) {
    const cacheBustKey = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    script.src = `${MOMENCE_SCRIPT_SRC}?reload=${cacheBustKey}`;
  } else {
    script.src = MOMENCE_SCRIPT_SRC;
  }

  const wrapper = document.createElement("div");
  wrapper.id = "ribbon-schedule";
  mountPoint.replaceChildren(wrapper, script);

  return () => {
    script.onload = null;
    script.onerror = null;
    mountPoint.replaceChildren();
  };
}
