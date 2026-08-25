import { useEffect, useMemo, useRef, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";

const GROUP_ORDER = [
  "Comité Rector",
  "Normas, Profesionalización y Ética Pública",
  "Transparencia, Rendición de Cuentas y Participación Ciudadana",
  "Coordinación para la Fiscalización",
  "Responsabilidades Administrativas y Jurídico Consultivo",
  "Control Interno",
];

const GROUP_LABELS = {
  "Comité Rector": ["Comité", "Rector"],
  "Normas, Profesionalización y Ética Pública": [
    "Normas, ética y",
    "profesionalización",
  ],
  "Transparencia, Rendición de Cuentas y Participación Ciudadana": [
    "Transparencia y",
    "participación",
  ],
  "Coordinación para la Fiscalización": [
    "Coordinación para",
    "la fiscalización",
  ],
  "Responsabilidades Administrativas y Jurídico Consultivo": [
    "Responsabilidades",
    "y jurídico consultivo",
  ],
  "Control Interno": ["Control", "interno"],
};

const GROUP_COLORS = [
  "#713972",
  "#8d477d",
  "#a64f7a",
  "#3f7687",
  "#28777a",
  "#4f7998",
];

const MapShell = styled("section")(({ theme }) => ({
  margin: theme.spacing(0, 0, 3),
  padding: theme.spacing(2.5),
  border: "1px solid rgba(113, 57, 114, 0.16)",
  borderRadius: 16,
  background:
    "radial-gradient(circle at 50% 38%, rgba(113, 57, 114, 0.09), transparent 29%), linear-gradient(145deg, #fff 0%, #faf8fb 100%)",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const Metrics = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: theme.spacing(1.25),
  maxWidth: 720,
  margin: `${theme.spacing(2)} auto ${theme.spacing(1)}`,
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const Metric = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.25, 1.5),
  textAlign: "center",
  borderRadius: 12,
  border: "1px solid rgba(113, 57, 114, 0.13)",
  backgroundColor: "rgba(255, 255, 255, 0.82)",
  "& strong": {
    display: "block",
    color: "#713972",
    fontSize: "1.35rem",
    lineHeight: 1.1,
  },
  "& span": {
    display: "block",
    marginTop: theme.spacing(0.35),
    color: theme.palette.text.secondary,
    fontSize: "0.76rem",
  },
}));

const MapViewport = styled(Box)(() => ({
  width: "100%",
  overflowX: "auto",
  scrollbarWidth: "thin",
}));

const OrbitSvg = styled("svg")(() => ({
  display: "block",
  width: "100%",
  minWidth: 700,
  height: "auto",
  margin: "0 auto",
  "& .orbit": {
    fill: "none",
    stroke: "rgba(113, 57, 114, 0.18)",
    strokeWidth: 1.5,
    strokeDasharray: "5 9",
  },
  "& .group-edge": {
    stroke: "rgba(113, 57, 114, 0.28)",
    strokeWidth: 2,
    transition: "stroke 180ms ease, stroke-width 180ms ease",
  },
  "& .group-edge.is-selected": {
    stroke: "#713972",
    strokeWidth: 4,
  },
  "& .group-node": {
    cursor: "pointer",
    outline: "none",
  },
  "& .group-node circle": {
    transition: "filter 180ms ease, transform 180ms ease, stroke-width 180ms ease",
    transformBox: "fill-box",
    transformOrigin: "center",
  },
  "& .group-node:hover circle, & .group-node:focus circle, & .group-node.is-selected circle": {
    filter: "drop-shadow(0 7px 8px rgba(44, 24, 45, 0.2))",
    transform: "scale(1.055)",
  },
  "& .group-node:focus circle": {
    strokeWidth: 7,
  },
  "& .group-count": {
    fill: "#fff",
    fontSize: 22,
    fontWeight: 800,
    textAnchor: "middle",
    pointerEvents: "none",
  },
  "& .group-label": {
    fill: "rgba(255, 255, 255, 0.94)",
    fontSize: 10.5,
    fontWeight: 650,
    textAnchor: "middle",
    pointerEvents: "none",
  },
}));

const DetailPanel = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  padding: theme.spacing(2),
  borderRadius: 14,
  border: "1px solid rgba(113, 57, 114, 0.16)",
  backgroundColor: "#fff",
  scrollMarginTop: 110,
  "&:focus": {
    outline: "3px solid rgba(113, 57, 114, 0.22)",
    outlineOffset: 3,
  },
}));

const SplitBar = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  height: 32,
  marginTop: 14,
  borderRadius: 999,
  overflow: "hidden",
  backgroundColor: "#eee9ef",
  "& span": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 44,
    color: "#fff",
    fontSize: "0.72rem",
    fontWeight: 700,
    transition: "width 260ms ease",
  },
}));

const Affiliations = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const AffiliationCard = styled(Box)(({ theme }) => ({
  minWidth: 0,
  padding: theme.spacing(1.5),
  borderRadius: 12,
  border: "1px solid rgba(72, 58, 75, 0.12)",
  backgroundColor: "#fcfbfc",
}));

const Participant = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  borderTop: "1px solid rgba(72, 58, 75, 0.09)",
  "&:first-of-type": {
    borderTop: 0,
  },
}));

const normalizeInstitution = (value = "") =>
  value.replace(/,\s*$/, "").trim().toLocaleLowerCase("es-MX");

const cleanInstitution = (value = "") => value.replace(/,\s*$/, "").trim();

const getGroupLabels = (name) => {
  if (GROUP_LABELS[name]) return GROUP_LABELS[name];
  const words = name.split(" ");
  const halfway = Math.ceil(words.length / 2);
  return [words.slice(0, halfway).join(" "), words.slice(halfway).join(" ")];
};

const AffiliationParticipants = ({ color, name, rows }) => (
  <AffiliationCard>
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
      <Box display="flex" alignItems="center" gap={1}>
        <Box
          component="span"
          sx={{ width: 11, height: 11, borderRadius: "50%", bgcolor: color }}
        />
        <Typography variant="subtitle2" sx={{ fontWeight: 800, color }}>
          {name}
        </Typography>
      </Box>
      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
        {rows.length}
      </Typography>
    </Box>

    <Box role="list" aria-label={`Participaciones de ${name}`}>
      {rows.map((row) => (
        <Participant role="listitem" key={`${row.id}-${row.responsable}`}>
          <Typography variant="body2" sx={{ fontWeight: 650, lineHeight: 1.3 }}>
            {cleanInstitution(row.entePublico)}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            display="block"
            sx={{ lineHeight: 1.3, mt: 0.35 }}
          >
            {row.responsable}
          </Typography>
        </Participant>
      ))}
    </Box>
  </AffiliationCard>
);

const SnfParticipationMap = ({ rows = [], loading = false, error = null }) => {
  const viewportRef = useRef(null);
  const detailRef = useRef(null);
  const [selectedGroupName, setSelectedGroupName] = useState("");

  const selectGroup = (groupName) => {
    setSelectedGroupName(groupName);
    window.requestAnimationFrame(() => {
      const detail = detailRef.current;
      if (!detail) return;
      detail.focus({ preventScroll: true });
      detail.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const summary = useMemo(() => {
    const groupsByName = new Map();
    const institutions = new Set();

    rows.forEach((row) => {
      const groupName = row.grupoDeTrabajo?.trim();
      if (!groupName) return;

      institutions.add(normalizeInstitution(row.entePublico));

      if (!groupsByName.has(groupName)) {
        groupsByName.set(groupName, {
          name: groupName,
          rows: [],
          asofis: [],
          cpcef: [],
        });
      }

      const group = groupsByName.get(groupName);
      group.rows.push(row);
      if (row.filial === "ASOFIS") group.asofis.push(row);
      if (row.filial === "CPCE-F") group.cpcef.push(row);
    });

    const groups = Array.from(groupsByName.values()).sort((a, b) => {
      const aIndex = GROUP_ORDER.indexOf(a.name);
      const bIndex = GROUP_ORDER.indexOf(b.name);
      return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    });

    return {
      groups,
      totalParticipations: rows.length,
      uniqueInstitutions: institutions.size,
      totalAsofis: rows.filter((row) => row.filial === "ASOFIS").length,
      totalCpcef: rows.filter((row) => row.filial === "CPCE-F").length,
    };
  }, [rows]);

  useEffect(() => {
    if (
      summary.groups.length &&
      !summary.groups.some((group) => group.name === selectedGroupName)
    ) {
      setSelectedGroupName(summary.groups[0].name);
    }
  }, [selectedGroupName, summary.groups]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (viewport && viewport.scrollWidth > viewport.clientWidth) {
      viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) / 2;
    }
  }, [summary.groups.length]);

  const positionedGroups = useMemo(() => {
    const centerX = 450;
    const centerY = 280;
    const radiusX = 290;
    const radiusY = 205;

    return summary.groups.map((group, index) => {
      const angle = -Math.PI / 2 + (index * Math.PI * 2) / summary.groups.length;
      return {
        ...group,
        x: centerX + Math.cos(angle) * radiusX,
        y: centerY + Math.sin(angle) * radiusY,
        color: GROUP_COLORS[index % GROUP_COLORS.length],
        labels: getGroupLabels(group.name),
      };
    });
  }, [summary.groups]);

  const selectedGroup =
    positionedGroups.find((group) => group.name === selectedGroupName) ||
    positionedGroups[0];

  if (loading) {
    return (
      <MapShell aria-live="polite">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={220}>
          <CircularProgress size={28} />
          <Typography variant="body2" color="textSecondary" ml={1.5}>
            Preparando el mapa de participación…
          </Typography>
        </Box>
      </MapShell>
    );
  }

  if (error || !summary.groups.length) return null;

  const selectedTotal = selectedGroup.rows.length;
  const asofisPercentage = (selectedGroup.asofis.length / selectedTotal) * 100;
  const cpcefPercentage = (selectedGroup.cpcef.length / selectedTotal) * 100;

  return (
    <MapShell aria-labelledby="snf-map-heading">
      <Box textAlign="center">
        <Typography id="snf-map-heading" variant="h6" component="h3" sx={{ fontWeight: 750 }}>
          Mapa interactivo de participación del SNF
        </Typography>
        <Typography variant="body2" color="textSecondary" mt={0.5}>
          Seleccione una instancia para conocer su integración y el equilibrio entre filiales.
        </Typography>
      </Box>

      <Metrics>
        <Metric>
          <strong>{summary.totalParticipations}</strong>
          <span>participaciones registradas</span>
        </Metric>
        <Metric>
          <strong>{summary.groups.length}</strong>
          <span>instancias de trabajo</span>
        </Metric>
        <Metric>
          <strong>{summary.uniqueInstitutions}</strong>
          <span>instituciones distintas</span>
        </Metric>
      </Metrics>

      <MapViewport ref={viewportRef}>
        <OrbitSvg
          viewBox="0 0 900 560"
          role="img"
          aria-labelledby="snf-orbit-title snf-orbit-description"
        >
          <title id="snf-orbit-title">Instancias de participación del SNF</title>
          <desc id="snf-orbit-description">
            Mapa interactivo con el Sistema Nacional de Fiscalización al centro y sus
            instancias de trabajo alrededor. Cada nodo indica el número de participaciones.
          </desc>

          <ellipse className="orbit" cx="450" cy="280" rx="290" ry="205" aria-hidden="true" />

          <g aria-hidden="true">
            {positionedGroups.map((group) => (
              <line
                key={`edge-${group.name}`}
                className={`group-edge ${
                  selectedGroup.name === group.name ? "is-selected" : ""
                }`}
                x1="450"
                y1="280"
                x2={group.x}
                y2={group.y}
              />
            ))}
          </g>

          <g aria-hidden="true">
            <circle cx="450" cy="280" r="100" fill="rgba(232, 214, 67, 0.2)" />
            <circle cx="450" cy="280" r="88" fill="#fff" stroke="#713972" strokeWidth="4" />
            <text x="450" y="250" textAnchor="middle" fill="#713972" fontSize="22" fontWeight="800">
              SNF
            </text>
            <text x="450" y="287" textAnchor="middle" fill="#713972" fontSize="32" fontWeight="850">
              {summary.totalParticipations}
            </text>
            <text x="450" y="310" textAnchor="middle" fill="#655b68" fontSize="11.5" fontWeight="650">
              PARTICIPACIONES
            </text>
            <text x="450" y="331" textAnchor="middle" fill="#7d747f" fontSize="11">
              {summary.totalAsofis} ASOFIS · {summary.totalCpcef} CPCE-F
            </text>
          </g>

          {positionedGroups.map((group) => {
            const isSelected = selectedGroup.name === group.name;
            return (
              <g
                key={group.name}
                className={`group-node ${isSelected ? "is-selected" : ""}`}
                role="button"
                tabIndex="0"
                aria-pressed={isSelected}
                aria-label={`${group.name}: ${group.rows.length} participaciones`}
                onClick={() => selectGroup(group.name)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    selectGroup(group.name);
                  }
                }}
              >
                <title>{`${group.name}: ${group.rows.length} participaciones`}</title>
                <circle
                  cx={group.x}
                  cy={group.y}
                  r="66"
                  fill={group.color}
                  stroke={isSelected ? "#e8d643" : "#fff"}
                  strokeWidth={isSelected ? 6 : 3}
                />
                <text className="group-count" x={group.x} y={group.y - 19}>
                  {group.rows.length}
                </text>
                <text className="group-label" x={group.x} y={group.y + 7}>
                  {group.labels.map((line, index) => (
                    <tspan key={line} x={group.x} dy={index === 0 ? 0 : 15}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </OrbitSvg>
      </MapViewport>

      <Typography variant="caption" color="textSecondary" display="block" textAlign="center">
        Cada cifra representa participaciones en una instancia; una misma institución puede
        intervenir en más de una.
      </Typography>

      <DetailPanel ref={detailRef} tabIndex="-1" aria-live="polite">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          flexWrap="wrap"
          gap={1}
        >
          <Box>
            <Typography variant="overline" color="textSecondary">
              Instancia seleccionada
            </Typography>
            <Typography variant="h6" component="h4" sx={{ fontWeight: 750, lineHeight: 1.25 }}>
              {selectedGroup.name}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 750, color: "#713972" }}>
            {selectedTotal} participaciones
          </Typography>
        </Box>

        <SplitBar
          role="img"
          aria-label={`${selectedGroup.asofis.length} participaciones ASOFIS y ${selectedGroup.cpcef.length} participaciones CPCE-F`}
        >
          {selectedGroup.asofis.length > 0 && (
            <span style={{ width: `${asofisPercentage}%`, backgroundColor: "#a64f7a" }}>
              ASOFIS {selectedGroup.asofis.length}
            </span>
          )}
          {selectedGroup.cpcef.length > 0 && (
            <span style={{ width: `${cpcefPercentage}%`, backgroundColor: "#28777a" }}>
              CPCE-F {selectedGroup.cpcef.length}
            </span>
          )}
        </SplitBar>

        <Affiliations>
          <AffiliationParticipants
            color="#a64f7a"
            name="ASOFIS"
            rows={selectedGroup.asofis}
          />
          <AffiliationParticipants
            color="#28777a"
            name="CPCE-F"
            rows={selectedGroup.cpcef}
          />
        </Affiliations>
      </DetailPanel>
    </MapShell>
  );
};

export default SnfParticipationMap;
