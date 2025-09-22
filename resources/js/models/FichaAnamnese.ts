export interface FichaAnamnese {
    id: number;
    lente_contato: boolean;
    epilepsia_convulsoes: boolean;
    funciona_instest_reg: boolean;
    trat_facial_anterior: boolean;
    agua_freq: boolean;
    bebida_alcool: boolean;
    filtro_solar: boolean;
    periodo_menstrual: boolean;
    boa_qual_sono: boolean;
    protese_corpo_fac: boolean;
    tabagismo: boolean;
    alteracoes_cardiacas: boolean;
    portador_marcapasso: boolean;
    gestante: boolean;
    problema_pele: boolean;
    tratamento_medico: boolean;
    tumor_lesao_cancer: boolean;
    boa_alimentacao: boolean;
    horas_por_noite: string | null;
    qual_anticoncepcional: string | null;
    tempo_gestante: string | null;
    motivo_estetico: string | null;
    pacientes_id: number;
    created_at: string;
    updated_at: string;
    paciente?: {
        id: number;
        nome: string;
        slug?: string;
    };
}