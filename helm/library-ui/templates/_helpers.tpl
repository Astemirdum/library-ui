

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "library-ui.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}


{{/*
Common labels
*/}}
{{- define "library-ui.labels" -}}
helm.sh/chart: {{ include "library-ui.chart" . }}


{{ include "library-ui.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{/*{{- if .Values.version }}*/}}
{{/*app.kubernetes.io/version: {{ .Values.version | quote }}*/}}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}



{{/*
Expand the namespace.
*/}}
{{- define "library-ui.namespace" -}}
{{- default .Values.namespace .Release.Namespace | trunc 63 | trimSuffix "-" }}
{{- end }}


{{/*
Selector labels
*/}}

{{- define "library-ui.selectorLabels" -}}
app.kubernetes.io/name: {{ include "library-ui.fullname" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}



{{- define "library-ui.fullname" -}}
{{- if .Values.libraryUI.fullname }}
{{- .Values.libraryUI.fullname | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.libraryUI.name }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*app strategy*/}}
{{- define "library-ui.strategy" -}}
rollingUpdate:
  maxSurge: {{ .Values.app.strategy.rollingUpdate.maxSurge}}
  maxUnavailable: {{ .Values.app.strategy.rollingUpdate.maxUnavailable}}
type: {{ .Values.app.strategy.type}}
{{- end }}


{{/*health*/}}
{{- define "library-ui.health" -}}
readinessProbe:
  httpGet: &health
    path: /manage/health
    port: {{ .Values.configData.libraryUI.http.port }}
    scheme: HTTP
  initialDelaySeconds: 20
  failureThreshold: 3
  periodSeconds: 30
  timeoutSeconds: 5
livenessProbe:
  httpGet: *health
  failureThreshold: 5
  periodSeconds: 60
  timeoutSeconds: 5
  successThreshold: 1
  initialDelaySeconds: 10
startupProbe:
  failureThreshold: 10
  httpGet: *health
  periodSeconds: 10
  timeoutSeconds: 5
  successThreshold: 1
{{- end }}


