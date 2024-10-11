"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { PatientFormValidation, UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser, registerPatient } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { SelectItem } from "@/components/ui/select";
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import Image from "next/image"
import { FileUploader } from "../FileUploader"
import fs from 'fs';


 
const RegisterForm= ({user}: {user: User }) => {
    const router = useRouter();
    const [isLoading, setIsLoading ]= useState(false)

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email:"",
      phone: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
        const patient = {
            userId: user.$id,
            name: values.name,
            email: values.email,
            phone: values.phone,
            birthDate: new Date(values.birthDate),
            gender: values.gender,
            address: values.address,
            occupation: values.occupation,
            emergencyContactName: values.emergencyContactName,
            emergencyContactNumber: values.emergencyContactNumber,
            primaryPhysician: values.primaryPhysician,
            insuranceProvider: values.insuranceProvider,
            insurancePolicyNumber: values.insurancePolicyNumber,
            allergies: values.allergies,
            currentMedication: values.currentMedication,
            familyMedicalHistory: values.familyMedicalHistory,
            pastMedicalHistory: values.pastMedicalHistory,
            identificationType: values.identificationType,
            identificationNumber: values.identificationNumber,
            identificationDocument: values.identificationDocument
              ? formData
              : undefined,
            privacyConsent: values.privacyConsent,
          };
    
          const newPatient = await registerPatient(patient);
    
          if (newPatient) {
            router.push(`/patients/${user.$id}/new-appointment`);
          }
    
    } catch (error) {
        console.log(error);
    }
      setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
            <h1 className="header">Bienvenue👋</h1>
            <p className="text-dark-700">Dites-nous en plus sur vous.</p>
        </section>
        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Informations personnelles</h2>
            </div>
        </section>

        <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Nom Complet"
            placeholder= "Nom complet"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
        />
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder= "Entrez votre email"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
        />
            <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                label="Numéro de téléphone"
                placeholder= "77 123 45 67"
            />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date de naissance"
            />
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Genre"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Adresse"
              placeholder="Dakar, Senegal"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Occupation"
              placeholder=" Ingénieur logiciel"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Nom de la personne à contacter en cas d'urgence"
              placeholder="nom..."
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Numéro de la personne à contacter en cas d'urgence"
              placeholder="78 900 88 77"
            />
          </div>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Informations médicales</h2>
            </div>
        </section>
        
            <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="primaryPhysician"
                label="Médecin traitant"
                placeholder="Selectionnez un médecin"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>



        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Fournisseur d'assurance"
              placeholder="nom..."
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Numéro de police d'assurance"
              placeholder="ABC123456789"
            />
          </div>


          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (Si vous en avez)"
              placeholder="Poissons, Arachides..."
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Médicaments actuels"
              placeholder="Ibuprofen 200mg, Paracétamole 500mg..."
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label=" Historique médical familial"
              placeholder="Hypertension..."
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Votre historique médical"
              placeholder="Asthme depuis mon enfance..."
            />
          </div>

          <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification et Vérification</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Type d'identification"
            placeholder="Sélectionnez une identification"
          >
          {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}         
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Numéro d'identification"
            placeholder="123456789"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Copies des scans d'identifications"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consentement et Confidentialité</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="J'accepte de recevoir un traitement pour ma santé."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="Je consens à l'utilisation et à la divulgation de mes données de santé
            à des fins de traitement."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="Je reconnais avoir lu et accepté les
            politique de confidentialité"
          />
        </section>

        <SubmitButton isLoading={isLoading}>Continuer</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm