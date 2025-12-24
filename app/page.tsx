"use client"
import React, { useState } from 'react';
import { User, Briefcase, Code, GraduationCap, Award, Download, Plus, Trash2, MapPin, Calendar, Clock, Euro } from 'lucide-react';

// Composant réutilisable pour les champs avec label - défini en dehors pour éviter les re-renders
const FormField = ({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) => (
  <div className={`flex flex-col ${className}`}>
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
    {children}
  </div>
);

// Styles des inputs
const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400";
const textareaClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none placeholder:text-gray-400";

export default function DossierCompetences() {
  const [profile, setProfile] = useState({
    nom: '',
    prenom: '',
    titre: '',
    experience: '',
    disponibilite: '',
    tjm: '',
    localisation: ''
  });

  interface Mission {
    id: number;
    client: string;
    projet: string;
    periode: string;
    duree: string;
    role: string;
    contexte: string;
    missions: string;
    technologies: string;
    environnement: string;
  }

  interface Formation {
    id: number;
    diplome: string;
    etablissement: string;
    annee: string;
  }

  interface Certification {
    id: number;
    nom: string;
    organisme: string;
    annee: string;
  }

  const [missions, setMissions] = useState<Mission[]>([]);
  const [competences, setCompetences] = useState({
    langages: [] as string[],
    frameworks: [] as string[],
    outils: [] as string[],
    methodologies: [] as string[]
  });

  const [formations, setFormations] = useState<Formation[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);

  const addMission = () => {
    setMissions([...missions, {
      id: Date.now(),
      client: '',
      projet: '',
      periode: '',
      duree: '',
      role: '',
      contexte: '',
      missions: '',
      technologies: '',
      environnement: ''
    }]);
  };

  const updateMission = (id: number, field: string, value: string) => {
    setMissions(missions.map(m => m.id === id ? {...m, [field]: value} : m));
  };

  const deleteMission = (id: number) => {
    setMissions(missions.filter(m => m.id !== id));
  };

  const addFormation = () => {
    setFormations([...formations, {
      id: Date.now(),
      diplome: '',
      etablissement: '',
      annee: ''
    }]);
  };

  const deleteFormation = (id: number) => {
    setFormations(formations.filter(f => f.id !== id));
  };

  const addCertification = () => {
    setCertifications([...certifications, {
      id: Date.now(),
      nom: '',
      organisme: '',
      annee: ''
    }]);
  };

  const deleteCertification = (id: number) => {
    setCertifications(certifications.filter(c => c.id !== id));
  };

  const exportPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none">

        {/* Header - Design moderne sans dégradé */}
        <header className="bg-blue-600 text-white p-8 print:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dossier de Compétences</h1>
              <p className="text-blue-100 mt-1 text-sm">Consultant IT - Régie & Assistance Technique</p>
            </div>
            <button
              onClick={exportPDF}
              className="flex items-center gap-2 bg-white text-blue-600 px-5 py-2.5 rounded-xl font-medium hover:bg-blue-50 transition-all print:hidden"
            >
              <Download size={18} />
              Exporter PDF
            </button>
          </div>
        </header>

        {/* Section Profil */}
        <section className="p-8 border-b border-gray-100 print:p-4">
          <div className="flex items-center gap-3 mb-8 print:mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center print:hidden">
              <User className="text-blue-600" size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Profil</h2>
          </div>

          {/* Version formulaire (écran) */}
          <div className="print:hidden">
            {/* Groupe Identité */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Identité</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Nom">
                  <input
                    type="text"
                    placeholder="Dupont"
                    className={inputClass}
                    value={profile.nom}
                    onChange={(e) => setProfile({...profile, nom: e.target.value})}
                  />
                </FormField>
                <FormField label="Prénom">
                  <input
                    type="text"
                    placeholder="Jean"
                    className={inputClass}
                    value={profile.prenom}
                    onChange={(e) => setProfile({...profile, prenom: e.target.value})}
                  />
                </FormField>
              </div>
            </div>

            {/* Groupe Poste */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Poste</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Titre du poste" className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="Développeur Full Stack Senior"
                    className={inputClass}
                    value={profile.titre}
                    onChange={(e) => setProfile({...profile, titre: e.target.value})}
                  />
                </FormField>
                <FormField label="Années d'expérience">
                  <div className="relative">
                    <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="5 ans"
                      className={`${inputClass} pl-10`}
                      value={profile.experience}
                      onChange={(e) => setProfile({...profile, experience: e.target.value})}
                    />
                  </div>
                </FormField>
                <FormField label="Localisation">
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Paris, France"
                      className={`${inputClass} pl-10`}
                      value={profile.localisation}
                      onChange={(e) => setProfile({...profile, localisation: e.target.value})}
                    />
                  </div>
                </FormField>
              </div>
            </div>

            {/* Groupe Disponibilité */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Disponibilité</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Disponibilité">
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Immédiate"
                      className={`${inputClass} pl-10`}
                      value={profile.disponibilite}
                      onChange={(e) => setProfile({...profile, disponibilite: e.target.value})}
                    />
                  </div>
                </FormField>
                <FormField label="TJM (optionnel)">
                  <div className="relative">
                    <Euro size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="500"
                      className={`${inputClass} pl-10`}
                      value={profile.tjm}
                      onChange={(e) => setProfile({...profile, tjm: e.target.value})}
                    />
                  </div>
                </FormField>
              </div>
            </div>
          </div>

          {/* Version print (compacte, en ligne) */}
          <div className="hidden print:block">
            <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
              <div className="flex">
                <span className="font-semibold text-gray-600 w-32">Nom :</span>
                <span className="text-gray-900">{profile.nom || '-'}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-600 w-32">Prénom :</span>
                <span className="text-gray-900">{profile.prenom || '-'}</span>
              </div>
              <div className="flex col-span-2">
                <span className="font-semibold text-gray-600 w-32">Titre :</span>
                <span className="text-gray-900">{profile.titre || '-'}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-600 w-32">Expérience :</span>
                <span className="text-gray-900">{profile.experience || '-'}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-600 w-32">Localisation :</span>
                <span className="text-gray-900">{profile.localisation || '-'}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-600 w-32">Disponibilité :</span>
                <span className="text-gray-900">{profile.disponibilite || '-'}</span>
              </div>
              {profile.tjm && (
                <div className="flex">
                  <span className="font-semibold text-gray-600 w-32">TJM :</span>
                  <span className="text-gray-900">{profile.tjm} €</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section Compétences Techniques */}
        <section className="p-8 border-b border-gray-100 print:p-4">
          <div className="flex items-center gap-3 mb-8 print:mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center print:hidden">
              <Code className="text-emerald-600" size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Compétences Techniques</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Langages de programmation">
              <input
                type="text"
                placeholder="Java, Python, JavaScript, C#..."
                className={inputClass}
                value={competences.langages.join(', ')}
                onChange={(e) => setCompetences({...competences, langages: e.target.value.split(',').map(s => s.trim())})}
              />
            </FormField>
            <FormField label="Frameworks & Librairies">
              <input
                type="text"
                placeholder="React, Angular, Spring Boot..."
                className={inputClass}
                value={competences.frameworks.join(', ')}
                onChange={(e) => setCompetences({...competences, frameworks: e.target.value.split(',').map(s => s.trim())})}
              />
            </FormField>
            <FormField label="Outils & Technologies">
              <input
                type="text"
                placeholder="Docker, Kubernetes, Git, AWS..."
                className={inputClass}
                value={competences.outils.join(', ')}
                onChange={(e) => setCompetences({...competences, outils: e.target.value.split(',').map(s => s.trim())})}
              />
            </FormField>
            <FormField label="Méthodologies">
              <input
                type="text"
                placeholder="Agile/Scrum, DevOps, CI/CD..."
                className={inputClass}
                value={competences.methodologies.join(', ')}
                onChange={(e) => setCompetences({...competences, methodologies: e.target.value.split(',').map(s => s.trim())})}
              />
            </FormField>
          </div>
        </section>

        {/* Section Expériences Professionnelles */}
        <section className="p-8 border-b border-gray-100 print:p-4">
          <div className="flex items-center justify-between mb-8 print:mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center print:hidden">
                <Briefcase className="text-orange-600" size={22} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Expériences Professionnelles</h2>
            </div>
            <button
              onClick={addMission}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-all print:hidden"
            >
              <Plus size={18} />
              Ajouter
            </button>
          </div>

          <div className="space-y-6">
            {missions.map((mission, index) => (
              <div key={mission.id} className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold text-gray-400 uppercase">Mission {index + 1}</span>
                  <button
                    onClick={() => deleteMission(mission.id)}
                    className="text-red-400 hover:text-red-600 transition-colors print:hidden"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Groupe Client & Projet */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FormField label="Client / Entreprise">
                    <input
                      type="text"
                      placeholder="Nom du client"
                      className={inputClass}
                      value={mission.client}
                      onChange={(e) => updateMission(mission.id, 'client', e.target.value)}
                    />
                  </FormField>
                  <FormField label="Nom du projet">
                    <input
                      type="text"
                      placeholder="Nom du projet"
                      className={inputClass}
                      value={mission.projet}
                      onChange={(e) => updateMission(mission.id, 'projet', e.target.value)}
                    />
                  </FormField>
                </div>

                {/* Groupe Période */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <FormField label="Période">
                    <input
                      type="text"
                      placeholder="Jan 2023 - Déc 2023"
                      className={inputClass}
                      value={mission.periode}
                      onChange={(e) => updateMission(mission.id, 'periode', e.target.value)}
                    />
                  </FormField>
                  <FormField label="Durée">
                    <input
                      type="text"
                      placeholder="12 mois"
                      className={inputClass}
                      value={mission.duree}
                      onChange={(e) => updateMission(mission.id, 'duree', e.target.value)}
                    />
                  </FormField>
                  <FormField label="Rôle / Fonction">
                    <input
                      type="text"
                      placeholder="Tech Lead"
                      className={inputClass}
                      value={mission.role}
                      onChange={(e) => updateMission(mission.id, 'role', e.target.value)}
                    />
                  </FormField>
                </div>

                {/* Groupe Description */}
                <div className="space-y-4 mb-4">
                  <FormField label="Contexte du projet">
                    <textarea
                      placeholder="Décrivez le contexte et les enjeux du projet..."
                      className={textareaClass}
                      rows={2}
                      value={mission.contexte}
                      onChange={(e) => updateMission(mission.id, 'contexte', e.target.value)}
                    />
                  </FormField>
                  <FormField label="Missions réalisées">
                    <textarea
                      placeholder="Détaillez vos tâches et responsabilités..."
                      className={textareaClass}
                      rows={4}
                      value={mission.missions}
                      onChange={(e) => updateMission(mission.id, 'missions', e.target.value)}
                    />
                  </FormField>
                </div>

                {/* Groupe Technique */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Technologies utilisées">
                    <input
                      type="text"
                      placeholder="React, Node.js, PostgreSQL..."
                      className={inputClass}
                      value={mission.technologies}
                      onChange={(e) => updateMission(mission.id, 'technologies', e.target.value)}
                    />
                  </FormField>
                  <FormField label="Environnement technique">
                    <input
                      type="text"
                      placeholder="AWS, Docker, Jenkins..."
                      className={inputClass}
                      value={mission.environnement}
                      onChange={(e) => updateMission(mission.id, 'environnement', e.target.value)}
                    />
                  </FormField>
                </div>
              </div>
            ))}

            {missions.length === 0 && (
              <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl print:hidden">
                <Briefcase size={40} className="mx-auto mb-3 opacity-50" />
                <p>Aucune mission ajoutée</p>
                <p className="text-sm">Cliquez sur "Ajouter" pour ajouter une mission</p>
              </div>
            )}
          </div>
        </section>

        {/* Section Formation */}
        <section className="p-8 border-b border-gray-100 print:p-4">
          <div className="flex items-center justify-between mb-8 print:mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center print:hidden">
                <GraduationCap className="text-purple-600" size={22} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Formation</h2>
            </div>
            <button
              onClick={addFormation}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-all print:hidden"
            >
              <Plus size={18} />
              Ajouter
            </button>
          </div>

          <div className="space-y-4">
            {formations.map((formation) => (
              <div key={formation.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  <FormField label="Diplôme" className="md:col-span-5">
                    <input
                      type="text"
                      placeholder="Master Informatique"
                      className={inputClass}
                      value={formation.diplome}
                      onChange={(e) => setFormations(formations.map(f => f.id === formation.id ? {...f, diplome: e.target.value} : f))}
                    />
                  </FormField>
                  <FormField label="Établissement" className="md:col-span-4">
                    <input
                      type="text"
                      placeholder="Université Paris-Saclay"
                      className={inputClass}
                      value={formation.etablissement}
                      onChange={(e) => setFormations(formations.map(f => f.id === formation.id ? {...f, etablissement: e.target.value} : f))}
                    />
                  </FormField>
                  <FormField label="Année" className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="2020"
                      className={inputClass}
                      value={formation.annee}
                      onChange={(e) => setFormations(formations.map(f => f.id === formation.id ? {...f, annee: e.target.value} : f))}
                    />
                  </FormField>
                  <div className="md:col-span-1 flex justify-end print:hidden">
                    <button
                      onClick={() => deleteFormation(formation.id)}
                      className="text-red-400 hover:text-red-600 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {formations.length === 0 && (
              <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl print:hidden">
                <GraduationCap size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Aucune formation ajoutée</p>
              </div>
            )}
          </div>
        </section>

        {/* Section Certifications */}
        <section className="p-8 print:p-4">
          <div className="flex items-center justify-between mb-8 print:mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center print:hidden">
                <Award className="text-amber-600" size={22} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Certifications</h2>
            </div>
            <button
              onClick={addCertification}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-all print:hidden"
            >
              <Plus size={18} />
              Ajouter
            </button>
          </div>

          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  <FormField label="Certification" className="md:col-span-5">
                    <input
                      type="text"
                      placeholder="AWS Solutions Architect"
                      className={inputClass}
                      value={cert.nom}
                      onChange={(e) => setCertifications(certifications.map(c => c.id === cert.id ? {...c, nom: e.target.value} : c))}
                    />
                  </FormField>
                  <FormField label="Organisme" className="md:col-span-4">
                    <input
                      type="text"
                      placeholder="Amazon Web Services"
                      className={inputClass}
                      value={cert.organisme}
                      onChange={(e) => setCertifications(certifications.map(c => c.id === cert.id ? {...c, organisme: e.target.value} : c))}
                    />
                  </FormField>
                  <FormField label="Année" className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="2024"
                      className={inputClass}
                      value={cert.annee}
                      onChange={(e) => setCertifications(certifications.map(c => c.id === cert.id ? {...c, annee: e.target.value} : c))}
                    />
                  </FormField>
                  <div className="md:col-span-1 flex justify-end print:hidden">
                    <button
                      onClick={() => deleteCertification(cert.id)}
                      className="text-red-400 hover:text-red-600 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {certifications.length === 0 && (
              <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl print:hidden">
                <Award size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Aucune certification ajoutée</p>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t border-gray-100">
          <p>Document confidentiel - Ne pas diffuser sans autorisation</p>
        </footer>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            margin: 0;
            size: A4;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
          input, textarea {
            border: none !important;
            padding: 4px 0 !important;
            background: transparent !important;
          }
          input::placeholder, textarea::placeholder {
            color: transparent !important;
          }
        }
      `}</style>
    </div>
  );
}
